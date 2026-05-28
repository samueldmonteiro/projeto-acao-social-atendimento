"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.warn('WARNING: DATABASE_URL environment variable is missing.');
}
const databaseURL = new URL(connectionString || 'postgres://placeholder@localhost/db');
const schema = databaseURL.searchParams.get('schema') ?? 'public';
const pool = new pg_1.Pool({ connectionString: connectionString || '' });
const adapter = new adapter_pg_1.PrismaPg(pool, { schema });
const prisma = new client_1.PrismaClient({
    adapter,
    log: process.env.NODE_ENV == 'development' ? ['query'] : undefined,
});
exports.prisma = prisma;
//# sourceMappingURL=prisma.js.map