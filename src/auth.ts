// nextauth核心配置中心，定义规则
import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "./lib/schema/auth.schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  //将nextAuth和prisma数据库打通，github登录的用户信息和账号关联会自动存入user/account表中,只给github oauth用
  // adapter: PrismaAdapter(prisma),
  //NextAuth 两种 session 模式：`database`（存在数据库）、`jwt`（存在加密 JWT token 里，放 cookie）
  session: {
    strategy: "jwt",
  },
  providers: [
    // GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // credentials不走adapter,并且强制jwt
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      // 校验链路 数据库user---调用authorize校验---成功的话调用jwt加密存cookie---然后调用session返回用户信息
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { username, password } = parsed.data;
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user || !user.password) return null;

        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) return null;
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // 登录成功拿到user 将user.id塞到jwt token中加密
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    // 调用auth()或useSession()获取session对象时，进入session回调从token中获取user信息
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
