import { addresses } from '@/database/schema';
import { createInsertSchema } from 'drizzle-zod';

export const insertAddressSchema = createInsertSchema(addresses, {
  street: ($) => $.street.min(1),
  number: ($) => $.number.min(1),
  neighborhood: ($) => $.neighborhood.min(1),
  city: ($) => $.city.min(1),
  state: ($) => $.state.min(1),
  zip_code: ($) => $.zip_code.min(1),
}).omit({
  order_id: true,
});

export type InsertAddressInput = typeof insertAddressSchema._input;
