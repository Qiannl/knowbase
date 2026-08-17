import { auth } from "@/auth";

export const runtime = "nodejs";

export default auth((req) => {
  const isLogin = !!req.auth;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isRegisterPage = req.nextUrl.pathname.startsWith("/register");

  // 未登录跳转登录页
  if (!isLogin && !isLoginPage && !isRegisterPage) {
    return Response.redirect(new URL("/login", req.url));
  }
  // 已登录访问登录页跳转首页
  if (isLogin && isLoginPage) {
    return Response.redirect(new URL("/", req.url));
  }
});

// 告诉next.js 这个中间件读哪些路径生效
export const config = { matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"] };
