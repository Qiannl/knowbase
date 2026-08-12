import { prisma } from '@/lib/prisma'

export default async function Home() {
  // 写一条测试数据
  const user = await prisma.user.upsert({
    where: { username: 'test' },
    update: {},
    create: { username: 'test', password: 'test123', nickname: '测试用户' },
  })

  // 读出来
  const users = await prisma.user.findMany()

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">知集 · 数据库连接测试</h1>
      <p className="mb-2">当前用户数：{users.length}</p>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(users, null, 2)}
      </pre>
    </main>
  )
}