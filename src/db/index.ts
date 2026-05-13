import { PrismaClient } from "../generated/prisma"; // Updated import path
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // Required for version 7.x

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
}

// Correctly initialize with a Pool
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
