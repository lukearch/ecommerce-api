import { relations } from 'drizzle-orm';
import {
  addresses,
  avaliations,
  categories,
  customers,
  movements,
  orders,
  products,
  productsToCategories,
  productsToOrders,
} from './schemas';

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ many }) => ({
  avaliations: many(avaliations),
  movements: many(movements),
  productsToOrders: many(productsToOrders),
  productsToCategories: many(productsToCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  productsToCategories: many(productsToCategories),
}));

export const avaliationsRelations = relations(avaliations, ({ one }) => ({
  product: one(products, {
    fields: [avaliations.product_id],
    references: [products.id],
  }),
}));

export const addressRelations = relations(addresses, ({ one }) => ({
  order: one(orders, {
    fields: [addresses.order_id],
    references: [orders.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customer_id],
    references: [customers.id],
  }),
  address: one(addresses),
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
  }),
);

export const movementsRelations = relations(movements, ({ one }) => ({
  product: one(products, {
    fields: [movements.product_id],
    references: [products.id],
  }),
}));
