// api/backend.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import ServerRequest from './ServerRequest'; // Certifique-se de que o arquivo existe e está com S maiúsculo

// Handler principal exportado para Vercel / Render
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return ServerRequest(req, res);
}
