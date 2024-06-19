import { RouteHandler } from '@astroneer/core';
import { HttpError } from '@astroneer/common';
import { updateProductSchema } from '@/database/validation/schemas';
import { parseZodError } from '@/helpers/parse-zod-error';
import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const PUT: RouteHandler = async (req, res) => {
  const body = await req.body();
  const { id } = req.params;

  if (!body) {
    throw new HttpError(400, 'Corpo da requisição não encontrado');
  }

  const validation = updateProductSchema.safeParse(body);

  if (!validation.success) {
    throw new HttpError(
      400,
      'Foram encontrados erros na validação',
      parseZodError(validation.error),
    );
  }

  if (!id) {
    throw new HttpError(400, 'ID do produto não encontrado');
  }

  const updated = await db
    .update(products)
    .set({
      ...validation.data,
      updated_at: new Date(),
    })
    .where(eq(products.id, id))
    .returning();

  if (!updated.length) {
    throw new HttpError(404, 'Produto não encontrado');
  }

  res.status(200).json({
    message: 'Produto atualizado com sucesso',
    data: updated.shift(),
  });
};
