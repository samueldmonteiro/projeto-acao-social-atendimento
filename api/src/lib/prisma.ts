import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('WARNING: DATABASE_URL environment variable is missing.');
}

// Fallback to a placeholder URL just to prevent 'new URL' throwing a sync hard crash.
// The Pg adapter will still fail if queries are actually attempted without a real DB.
const databaseURL = new URL(connectionString || 'postgres://placeholder@localhost/db');
const schema = databaseURL.searchParams.get('schema') ?? 'public';

const adapter = new PrismaPg({ connectionString: connectionString || '' }, { schema: schema });
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV == 'development' ? ['query'] : undefined,
});

export { prisma };