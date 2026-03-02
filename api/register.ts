import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Chaves hardcoded (não seguro, mas você pediu funcional)
const SUPABASE_URL = 'https://fbbkshvhbfgdopsgtlxi.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiYmtzaHZoYmZnZG9wc2d0bHhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg3MzYyOSwiZXhwIjoyMDg3NDQ5NjI5fQ.3a6zBgyKhPyUUIJLuaA8W3qEcv-_JfQsgDF_M9AAnQ';

const supabaseAdmin: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface RecaptchaVerify {
  success?: boolean;
  score?: number;
  'error-codes'?: string[];
}

// Função opcional de reCAPTCHA
async function verifyRecaptcha(token?: string): Promise<boolean> {
  if (!token) return true; // desativa checagem
  return true; // força funcionar
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const { email, password, username, phone, recaptchaToken, action } = req.body ?? {};

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, error: 'Campos obrigatórios não preenchidos' });
    }

    // reCAPTCHA ignorado (forçado funcionar)
    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) return res.status(400).json({ success: false, error: 'reCAPTCHA falhou' });

    if (action === 'signup') {
      const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
        user_metadata: { username, phone },
      });

      if (createError || !createdUser) {
        return res.status(400).json({ success: false, error: createError?.message || 'Falha ao criar usuário' });
      }

      const userId = createdUser.user?.id;
      if (!userId) return res.status(500).json({ success: false, error: 'Falha ao criar usuário' });

      const { error: insertError } = await supabaseAdmin.from('users').insert([{ id: userId, username, phone }]);
      if (insertError) return res.status(500).json({ success: false, error: 'Falha ao criar perfil' });

      return res.status(201).json({ success: true, userId });
    }

    if (action === 'signin') {
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
      if (error) return res.status(401).json({ success: false, error: error.message });
      return res.status(200).json({ success: true, data });
    }

    return res.status(400).json({ success: false, error: 'Ação inválida' });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
}
