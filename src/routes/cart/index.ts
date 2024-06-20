import { insertCustomerSchema } from '@/validation/customer';
import { withBodyValidation } from '@astroneer/validation';
import { z } from 'zod';

const cartSchema = z.object({
  customer: z.lazy(() => insertCustomerSchema),
});

export const POST = withBodyValidation(cartSchema, async (req, res) => {
  const body = await req.body<z.infer<typeof cartSchema>>();
});
