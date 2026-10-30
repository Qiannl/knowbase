import "dotenv/config"
import bcrypt from "bcryptjs"
import { prisma }from "../src/lib/prisma"

async function main() { 
    const username = process.env.SEED_ADMIN_USERNAME
    const password = process.env.SEED_ADMIN_PASSWORD
    const email = process.env.SEED_ADMIN_EMAIL

    if(!username || !password) {
        throw new Error("Please set ADMIN_USERNAME and ADMIN_PASSWORD in .env")
    }
    if(password.length < 10){
        throw new Error("Password must be at least 10 characters")
    }
    // 需要校验管理员的唯一性，存在即跳过，不存在就创建，脚本可以安全地重复执行。这叫“幂等性”。
    const existingAdmin = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if(existingAdmin) {
        console.log(`Admin user ${username} already exists`)
        return
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const admin = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email: email || null,
            nickname:'管理员admin',
            role: "admin"
        },
        select: {
            id: true,
            username: true,
            role: true,
            createdAt: true,
        }
    });
    console.log('管理员初始化成功',admin)
}

main()
  .catch( (e:unknown) => {
    console.error('管理员初始化失败',e)
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });