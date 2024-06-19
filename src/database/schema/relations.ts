import { relations } from 'drizzle-orm';
import {
  addresses,
  avaliations,
  categories,
  coupoms,
  customers,
  movements,
  orders,
  products,
  productsToCategories,
  productsToOrders,
} from './schemas';

export const customersRelations = relations(customers, ({ one, many }) => ({
  address: one(addresses),
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ many }) => ({
  avaliations: many(avaliations),
  productsToOrders: many(productsToOrders),
  movements: many(movements),
  categories: many(categories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const avaliationsRelations = relations(avaliations, ({ one }) => ({
  product: one(products, {
    fields: [avaliations.product_id],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customer_id],
    references: [customers.id],
  }),
  productsToOrders: many(productsToOrders),
}));

export const productsToCategoriesRelations = relations(
  productsToCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToCategories.product_id],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productsToCategories.category_id],
      references: [categories.id],
    }),
  }),
);

export const productsToOrdersRelations = relations(
  productsToOrders,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToOrders.product_id],
      references: [products.id],
    }),
    order: one(orders, {
      fields: [productsToOrders.order_id],
      references: [orders.id],
    }),
    coupom: one(coupoms, {
      fields: [productsToOrders.coupom_id],
      references: [coupoms.id],
    }),
  }),
);

export const movementsRelations = relations(movements, ({ one }) => ({
  product: one(products, {
    fields: [movements.product_id],
    references: [products.id],
  }),
}));
