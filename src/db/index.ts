import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
}

const getDatabaseTarget = (urlValue: string) => {
    try {
        const parsed = new URL(urlValue);
        const dbName = parsed.pathname.replace(/^\//, "") || "unknown";
        const port = parsed.port || "5432";

        return `${parsed.hostname}:${port}/${dbName}`;
    } catch {
        return "invalid DATABASE_URL";
    }
};

export const databaseTarget = getDatabaseTarget(connectionString);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;