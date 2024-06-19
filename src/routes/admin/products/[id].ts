import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import {
  UpdateProductInput,
  updateProductSchema,
} from '@/database/validation/schemas';
import { HttpError } from '@astroneer/common';
import { RouteHandler } from '@astroneer/core';
import { withBodyValidation } from '@astroneer/validation';
import { eq } from 'drizzle-orm';

export const PUT: RouteHandler = withBodyValidation(
  updateProductSchema,
  async (req, res) => {
    const body = await req.body<UpdateProductInput>();
    const { id } = req.params;

    if (!id) {
      throw new HttpError(400, 'ID do produto não encontrado');
    }

    const updated = await db
      .update(products)
      .set(body)
      .where(eq(products.id, id))
      .returning();

    if (!updated.length) {
      throw new HttpError(404, 'Produto não encontrado');
    }

    res.status(200).json({
      message: 'Produto atualizado com sucesso',
      data: updated.shift(),
    });
  },
);
