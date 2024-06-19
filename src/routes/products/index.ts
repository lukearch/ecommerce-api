import { db } from '@/database/drizzle';
import { RouteHandler } from '@astroneer/core';

export const GET: RouteHandler = async (_, res) => {
  const products = await db.query.products.findMany();
  res.json(products);
};
