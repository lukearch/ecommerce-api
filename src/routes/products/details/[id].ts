import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import { HttpError } from '@astroneer/common';
import { RouteHandler } from '@astroneer/core';
import { eq } from 'drizzle-orm';

export const GET: RouteHandler = async (req, res) => {
  if (!req.params.id) {
    throw new HttpError(400, 'ID do produto não encontrado');
  }

  const product = await db.query.products.findFirst({
    where: eq(products.id, req.params.id),
  });

  if (!product) {
    throw new HttpError(404, 'Produto não encontrado');
  }

  res.json(product);
};
