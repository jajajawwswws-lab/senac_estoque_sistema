
// api/ServerRequest.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { findUserByEmail } from './users';

export default async function ServerRequest(req: VercelRequest, res: VercelResponse) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios' });
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Login falhou' });
  }

  return res.status(200).json({ success: true, user: { email: user.email, username: user.username } });
}
