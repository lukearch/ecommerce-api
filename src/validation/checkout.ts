import { z } from 'zod';
import { insertAddressSchema } from './address';
import { insertCustomerSchema } from './customer';

export const checkoutSchema = z.object({
  customer: z.lazy(() => insertCustomerSchema),
  address: z.lazy(() => insertAddressSchema),
  products: z.array(
    z.object({
      product_id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type Checkout = z.infer<typeof checkoutSchema>;
