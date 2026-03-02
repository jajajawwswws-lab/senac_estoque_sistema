import { findUserByEmail, getAllUsers } from "./users.js"; // suas funções
import { supabaseAdmin } from "./banco.js";
import { VercelRequest, VercelResponse } from '@vercel/node';
//ssss
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') return response.status(200).end();
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido' });

  try {
    const { email, password, action } = request.body;

    if (action === 'signup') {
      const { data, error } = await supabaseAdmin.auth.signUp({ email, password });
      if (error) throw error;
      return response.status(201).json(data);
    }

    if (action === 'signin') {
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return response.status(200).json(data);
    }

    return response.status(400).json({ error: 'Ação inválida' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
}

