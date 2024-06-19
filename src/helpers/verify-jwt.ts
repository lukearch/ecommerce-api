import { HttpError, Logger } from '@astroneer/common';
import jwt from 'jsonwebtoken';

export function verifyJWT<T = unknown>(token: string): T {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    Logger.error('JWT_SECRET não foi definido.');
    throw new HttpError(500, 'Não foi possível verificar o token JWT.');
  }

  try {
    return jwt.verify(token, secret) as T;
  } catch (err) {
    Logger.error(err);
    throw new HttpError(401, 'Sessão inválida ou expirada.');
  }
}
