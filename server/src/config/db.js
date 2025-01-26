const path = require("path");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("Connected to the database:", result);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

module.exports = prisma;
