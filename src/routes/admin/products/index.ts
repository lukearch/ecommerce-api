import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import { InsertProductInput, insertProductSchema } from '@/validation/product';
import { RouteHandler } from '@astroneer/core';
import { withBodyValidation } from '@astroneer/validation';

export const POST: RouteHandler = withBodyValidation(
  insertProductSchema,
  async (req, res) => {
    const body = await req.body<InsertProductInput>();
    const created = await db.insert(products).values(body).returning();
    res.status(201).json({
      message: 'Produto cadastrado com sucesso',
      data: created.shift(),
    });
  },
);
