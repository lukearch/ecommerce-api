import { createInsertSchema } from 'drizzle-zod';
import { products } from '../schema';

export const insertProductSchema = createInsertSchema(products, {
  name: ($) =>
    $.name.min(1, {
      message: 'Informe o nome do produto',
    }),
  description: ($) =>
    $.description.min(1, {
      message: 'Informe a descrição do produto',
    }),
  sku: ($) =>
    $.sku.min(1, {
      message: 'Informe o SKU do produto',
    }),
  price_cents: ($) =>
    $.price_cents.min(0, {
      message: 'Informe o preço do produto',
    }),
  weight: ($) =>
    $.weight.positive({
      message: 'Informe o peso do produto',
    }),
  dx: ($) =>
    $.dx.positive({
      message: 'Informe a dimensão x do produto',
    }),
  dy: ($) =>
    $.dy.positive({
      message: 'Informe a dimensão y do produto',
    }),
  dz: ($) =>
    $.dz.positive({
      message: 'Informe a dimensão z do produto',
    }),
  specifications: ($) => $.specifications.optional(),
  images: ($) => $.images.array().optional(),
});

export const updateProductSchema = insertProductSchema.omit({});
