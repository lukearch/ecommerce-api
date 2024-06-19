import { customers } from '@/database/schema';
import { isCPF } from '@/helpers/is-cpf';
import { createInsertSchema } from 'drizzle-zod';

export const insertCustomerSchema = createInsertSchema(customers, {
  name: ($) => $.name.min(1),
  cpf: ($) => $.cpf.refine((cpf) => isCPF(cpf)),
  email: ($) => $.email.email(),
  phone: ($) => $.phone.min(9),
});

export type InsertCustomerInput = typeof insertCustomerSchema._input;
