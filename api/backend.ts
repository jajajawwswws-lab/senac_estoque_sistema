// api/backend.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import ServerRequest from './ServerRequest';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas repassa para ServerRequest
  return ServerRequest(req, res);
}
