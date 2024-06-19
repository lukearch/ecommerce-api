import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  cpf: text('cpf'),
  phone: text('phone'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const addresses = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  customer_id: uuid('customer_id')
    .notNull()
    .references(() => customers.id),
  street: text('street').notNull(),
  number: text('number').notNull(),
  neighborhood: text('neighborhood').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zip_code: text('zip_code').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().notNull(),
  description: text('description').notNull(),
  price_cents: real('price_cents').notNull(),
  images: text('images').array(),
  sku: text('sku').notNull(),
  weight: real('weight').notNull(),
  dx: real('dx').notNull(),
  dy: real('dy').notNull(),
  dz: real('dz').notNull(),
  specifications: jsonb('specifications'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const productsToCategories = pgTable(
  'products_to_categories',
  {
    product_id: uuid('product_id')
      .notNull()
      .references(() => products.id),
    category_id: uuid('category_id')
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.product_id, t.category_id],
    }),
  }),
);

export const avaliations = pgTable('avaliations', {
  id: uuid('id').defaultRandom().primaryKey(),
  customer_name: text('customer_name').notNull(),
  product_id: uuid('product_id')
    .notNull()
    .references(() => products.id),
  comment: text('comment'),
  rating: integer('rating').notNull(),
  avatar_url: text('avatar_url').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const movementsTypes = pgEnum('movements_types', ['in', 'out']);

export const movements = pgTable('movements', {
  id: uuid('id').defaultRandom().primaryKey(),
  quantity: integer('quantity').notNull(),
  type: movementsTypes('type').notNull(),
  product_id: uuid('product_id')
    .notNull()
    .references(() => products.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customer_id: uuid('customer_id')
    .notNull()
    .references(() => customers.id),
  coupom_id: uuid('coupom_id').references(() => coupoms.id),
  total_cents: real('total_cents').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const productsToOrders = pgTable(
  'products_to_orders',
  {
    product_id: uuid('product_id')
      .notNull()
      .references(() => products.id),
    order_id: uuid('order_id')
      .notNull()
      .references(() => orders.id),
    quantity: integer('quantity').notNull(),
    coupom_id: uuid('coupom_id').references(() => coupoms.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.product_id, t.order_id],
    }),
  }),
);

export const coupomTypes = pgEnum('coupom_types', ['percent', 'fixed']);
export const expirationTypes = pgEnum('expiration_types', [
  'days',
  'date',
  'uses',
  'never',
]);

export const coupoms = pgTable('coupoms', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull(),
  type: coupomTypes('type').notNull(),
  value: real('value').notNull(),
  active: boolean('active').notNull().default(true),
  expiration_type: expirationTypes('expiration_type').notNull(),
  expires_at: date('expires_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
