import { verifyJWT } from '@/helpers/verify-jwt';
import { HttpError } from '@astroneer/common';
import { RouteMiddleware } from '@astroneer/core';

export const auth: RouteMiddleware = async (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpError(
      401,
      'É necessário estar autenticado para acessar este recurso.',
    );
  }

  const token = getBearerToken(authorization);

  try {
    const decoded = verifyJWT(token);
    req.append('user', decoded);
    next();
  } catch (err) {
    throw new HttpError(401, 'Sessão inválida ou expirada.');
  }
};

function getBearerToken(authorization: string) {
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    throw new HttpError(401, 'Tipo de autenticação inválido.');
  }

  return token;
}
