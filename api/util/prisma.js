import { PrismaClient } from '@prisma/client';

// Use globalThis to avoid multiple instances during development (hot-reload)
const globalKey = '__prismaClient__';

let prisma = globalThis[globalKey];
if (!prisma) {
	prisma = new PrismaClient();
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

