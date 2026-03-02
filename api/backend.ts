// api/backend.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import ServerRequest from './ServerRequest'; // Importa corretamente o default

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return ServerRequest(req, res);
}
