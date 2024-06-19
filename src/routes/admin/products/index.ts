import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import { insertProductSchema } from '@/database/validation/schemas';
import { parseZodError } from '@/helpers/parse-zod-error';
import { HttpError } from '@astroneer/common';
import { RouteHandler } from '@astroneer/core';

export const POST: RouteHandler = async (req, res) => {
  const body = await req.body();

  if (!body) {
    throw new HttpError(400, 'Corpo da requisição não encontrado');
  }

  const validation = insertProductSchema.safeParse(body);

  if (!validation.success) {
    throw new HttpError(
      400,
      'Foram encontrados erros na validação',
      parseZodError(validation.error),
    );
  }

  const created = await db.insert(products).values(validation.data).returning();

  res.status(201).json({
    message: 'Produto cadastrado com sucesso',
    data: created.shift(),
  });
};
