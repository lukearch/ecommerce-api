import { db } from '@/database/drizzle';
import { customers } from '@/database/schema';
import { Checkout, checkoutSchema } from '@/validation/checkout';
import { RouteHandler } from '@astroneer/core';
import { withBodyValidation } from '@astroneer/validation';

export const POST: RouteHandler = withBodyValidation(
  checkoutSchema,
  async (req, res) => {
    const body = await req.body<Checkout>();

    let customer = await db.query.customers.findMany({
      where(fields, operators) {
        return operators.eq(fields.cpf, body.customer.cpf);
      },
      columns: {
        id: true,
      },
    });

    if (!customer.length) {
      customer = await db.insert(customers).values(body.customer).returning();
    }

    console.log(customer);

    res.json({ message: 'Compra realizada com sucesso' });
  },
);
