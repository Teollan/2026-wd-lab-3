import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });

export async function pingDb(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}
