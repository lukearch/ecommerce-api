import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import { RouteHandler } from '@astroneer/core';
import { ilike, sql } from 'drizzle-orm';

export const GET: RouteHandler = async (req, res) => {
  const data = await db.query.products.findMany({
    where: ilike(products.name, `%${req.query.q}%`),
    orderBy: sql`created_at DESC`,
  });

  res.json(data);
};
