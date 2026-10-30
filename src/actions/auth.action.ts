"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  addUserSchema,
  type AddUserInput,
} from "@/lib/schema/auth.schema";
import { auth } from "@/auth";

export async function createUserByAdmin(rawData: unknown) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  // 加上：校验当前登录用户角色必须是 admin
  if (session.user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }
  // 用定义好的schema校验用户数据，safeParse是zod的一个方法，返回一个对象，返回数据success、data、error
  const parseResult = addUserSchema.safeParse(rawData);
  if (!parseResult.success) {
    return new Response(parseResult.error.message, { status: 500 });
  }
  const { username, nickname, email, password, role, bio } =
    parseResult.data as AddUserInput;
  // 校验用户名和邮箱的唯一性
  const exist = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (exist) {
    if (exist.username === username) {
      return new Response("用户名已占用", { status: 500 });
    } else {
      return new Response("邮箱已占用", { status: 500 });
    }
  }
  // 密码加密 哈希
  const hashedPassword = await bcrypt.hash(password, 10);
  // select是返回给前端的字段
  const newUser = await prisma.user.create({
    data: {
      username,
      nickname,
      email,
      password: hashedPassword,
      role,
      bio,
    },
    select: {
      id: true,
      username: true,
      nickname: true,
      email: true,
      role: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newUser;
}

