import { PrismaClient } from "../db/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

// 在node全局对象上挂载prisma属性
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 实例化适配器
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// 创建prisma实例
const prismaInstance =
  globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["query"] });

// 只在开发环境将prisma实例挂载到全局对象上
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;

export const prisma = prismaInstance;
