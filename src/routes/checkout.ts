import { db } from '@/database/drizzle';
import {
  addresses,
  customers,
  orders,
  ordersRelations,
} from '@/database/schema';
import { Checkout, checkoutSchema } from '@/validation/checkout';
import { HttpError } from '@astroneer/common';
import { RouteHandler } from '@astroneer/core';
import { withBodyValidation } from '@astroneer/validation';

export const POST: RouteHandler = withBodyValidation(
  checkoutSchema,
  async (req, res) => {
    const body = await req.body<Checkout>();

    const [products, customer] = await Promise.all([
      db.query.products
        .findMany({
          where(fields, operators) {
            return operators.inArray(
              fields.id,
              body.products.map((p) => p.product_id),
            );
          },
        })
        .then((products) =>
          products.map((p) => ({
            ...p,
            quantity: body.products.find((bp) => bp.product_id === p.id)
              ?.quantity,
          })),
        ),
      db.query.customers.findMany({
        where(fields, operators) {
          return operators.eq(fields.cpf, body.customer.cpf);
        },
      }),
    ]);

    if (!customer.length) {
      const newCustomer = await db
        .insert(customers)
        .values(body.customer)
        .returning();

      customer.concat(newCustomer);
    }

    const cc = customer.shift();

    if (!cc) {
      throw new HttpError(500, 'Erro ao criar cliente');
    }

    const order = await db.insert(orders).values({
      customer_id: cc.id,
      total_cents: products.reduce(
        (acc, p) => acc + p.price_cents * (p.quantity ?? 1),
        0,
      ),
    });

    res.json({ message: 'Compra realizada com sucesso' });
  },
);
