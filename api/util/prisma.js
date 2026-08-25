import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL must be set before connecting to Prisma.')
}

// Use globalThis to avoid multiple instances during development (hot-reload)
const globalKey = '__prismaClient__';

let prisma = globalThis[globalKey];
if (!prisma) {
	const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
	prisma = new PrismaClient({ adapter });
	// In non-production attach to globalThis to prevent re-creation
	if (process.env.NODE_ENV !== 'production') {
		globalThis[globalKey] = prisma;
	}
}

async function connect() {
	try {
		await prisma.$connect();
	} catch (err) {
		// swallow to keep usage optional
	}
}

async function disconnect() {
	try {
		await prisma.$disconnect();
	} catch (err) {
		// noop
	}
}

export { prisma, connect, disconnect };
