import { createInsertSchema } from 'drizzle-zod';
import { products } from '../database/schema';

export const insertProductSchema = createInsertSchema(products, {
  price_cents: ($) => $.price_cents.min(0),
  weight: ($) => $.weight.positive(),
  dx: ($) => $.dx.positive(),
  dy: ($) => $.dy.positive(),
  dz: ($) => $.dz.positive(),
  metadata: ($) => $.metadata.optional(),
  images: ($) => $.images.array().optional(),
});

export const updateProductSchema = insertProductSchema.omit({});

export type InsertProductInput = typeof insertProductSchema._input;
export type UpdateProductInput = typeof updateProductSchema._input;
