import { orders } from '@/database/schema';
import { createInsertSchema } from 'drizzle-zod';

export const insertOrderSchema = createInsertSchema(orders, {
  coupom_id: ($) => $.coupom_id.optional(),
  customer_id: ($) => $.customer_id.uuid(),
  total_cents: ($) => $.total_cents.min(0),
});
