import "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: string;
  }
// 使用&是为了保留auth默认的Session的字段
  interface Session {
    user: {
      id: string;
      username?: string | null;
      email?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    role?: string;
  }
}
