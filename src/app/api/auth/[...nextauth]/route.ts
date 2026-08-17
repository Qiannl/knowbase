// 负责接受浏览器请求 /api/auth/...下的请求都会走到这里
import { handlers } from "@/auth";
export const { GET, POST } = handlers;