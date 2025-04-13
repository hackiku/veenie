import { defineConfig } from 'drizzle-kit';
import { env } from 'process';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
  dbCredentials: {
		url: env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/veenie',
		// url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/veenie',
  },

  verbose: true,
  strict: true,
  dialect: 'postgresql'
});
