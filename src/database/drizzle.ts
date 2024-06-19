/**
 * For this example, we are using `postgres` as the database driver.
 * Please refer to the https://orm.drizzle.team/docs to see the list of supported database drivers and how to use them.
 */

import { isDevMode, Logger } from '@astroneer/common';
import { drizzle as drizzleORM } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const queryClient = postgres(process.env.DATABASE_URL ?? '', {
  connection: {
    application_name: 'vape-store-api',
    TimeZone: 'UTC',
    DateStyle: 'ISO, MDY',
  },
});

export const db = drizzleORM(queryClient, {
  logger: {
    logQuery(query, params) {
      isDevMode() &&
        Logger.debug(`${query} ${JSON.stringify(params, null, 2)}`);
    },
  },
  schema,
});
