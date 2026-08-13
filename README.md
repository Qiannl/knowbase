# 知识库项目

## 技术栈：TypeScript + React 18 + Next.js 14+ App Router + Tailwind CSS + shadcn/ui + React Hook Form + Zod + TanStack Query + PostgreSQL + Prisma 鉴权+ NextAuth.js  +   Vercel 

## 项目结构
zhiji/
├── prisma/                          # 数据库层
│   ├── schema.prisma                # 数据模型定义
│   ├── migrations/                  # 迁移文件（自动生成，别手改）
│   └── seed.ts                      # 种子数据（可选，初始化演示账号/文档）
│
├── public/                          # 静态资源
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── app/                         # App Router 路由（核心）
│   │   ├── (auth)/                  # 路由组：登录相关，不影响URL
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx    # 如果用 NextAuth 自己写；Clerk 不需要这层
│   │   │
│   │   ├── (dashboard)/             # 路由组：登录后主应用，共享布局
│   │   │   ├── layout.tsx           # 侧边栏 + 顶栏布局，鉴权守卫
│   │   │   ├── page.tsx             # 首页重定向到 /docs 或直接是文档列表
│   │   │   ├── docs/
│   │   │   │   ├── page.tsx         # 文档列表
│   │   │   │   ├── new/page.tsx     # 新建文档
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx     # 文档详情
│   │   │   │       └── edit/page.tsx # 编辑文档
│   │   │   ├── ai/
│   │   │   │   └── page.tsx         # AI 对话页
│   │   │   ├── settings/
│   │   │   │   └── page.tsx         # 个人设置
│   │   │   └── admin/
│   │   │       └── users/
│   │   │           └── page.tsx     # 用户管理（管理员）
│   │   │
│   │   ├── api/                     # Route Handlers
│   │   │   ├── ai/
│   │   │   │   └── chat/route.ts    # AI 对话 SSE 流式接口
│   │   │   └── upload/route.ts      # 图片上传（如果需要）
│   │   │
│   │   ├── layout.tsx               # 根布局（全局字体、Providers、主题）
│   │   ├── globals.css              # 全局样式 + Tailwind 指令
│   │   ├── not-found.tsx            # 404 页面
│   │   ├── error.tsx                # 全局错误边界
│   │   └── loading.tsx              # 全局加载态
│   │
│   ├── components/                  # 可复用组件
│   │   ├── ui/                      # shadcn/ui 生成的基础组件（button、card、input...）
│   │   ├── layout/                  # 布局组件
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   └── dashboard-shell.tsx
│   │   ├── docs/                    # 文档相关组件
│   │   │   ├── doc-card.tsx
│   │   │   ├── doc-list.tsx
│   │   │   ├── doc-editor.tsx       # Tiptap 编辑器封装
│   │   │   └── search-bar.tsx
│   │   ├── ai/                      # AI 对话组件
│   │   │   ├── chat-message.tsx
│   │   │   ├── chat-input.tsx
│   │   │   └── typing-indicator.tsx
│   │   ├── common/                  # 通用组件
│   │   │   ├── empty-state.tsx
│   │   │   ├── confirm-dialog.tsx
│   │   │   └── page-header.tsx
│   │   └── providers/               # 全局 Provider
│   │       ├── query-provider.tsx   # TanStack Query
│   │       └── theme-provider.tsx   # 主题（如果做暗色模式）
│   │
│   ├── lib/                         # 工具函数和第三方封装
│   │   ├── prisma.ts                # Prisma Client 单例
│   │   ├── auth.ts                  # 鉴权配置（Clerk 或 NextAuth）
│   │   ├── ai.ts                    # LLM API 封装
│   │   ├── utils.ts                 # 通用工具（cn 类名合并、日期格式化）
│   │   └── validators/              # Zod schema
│   │       ├── doc.ts
│   │       └── user.ts
│   │
│   ├── actions/                     # Server Actions（Next.js 推荐的服务端函数）
│   │   ├── doc-actions.ts           # 文档增删改
│   │   ├── user-actions.ts          # 用户管理
│   │   └── settings-actions.ts      # 个人设置
│   │
│   ├── hooks/                       # 自定义 React Hooks
│   │   ├── use-docs.ts              # 文档相关的 TanStack Query hooks
│   │   └── use-debounce.ts
│   │
│   ├── types/                       # TypeScript 类型定义
│   │   └── index.ts                 # 全局类型、API 返回类型
│   │
│   └── middleware.ts                # Next.js 中间件（鉴权守卫、路由保护）
│
├── tests/                           # 测试
│   ├── unit/                        # Vitest 单元测试
│   │   ├── lib/
│   │   └── validators/
│   ├── components/                  # RTL 组件测试
│   └── e2e/                         # Playwright 端到端
│       └── auth.spec.ts
│
├── .env                             # 本地环境变量（不提交）
├── .env.example                     # 环境变量模板（提交，给别人参考）
├── .gitignore
├── components.json                  # shadcn/ui 配置
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts                   # Vitest 配置
├── playwright.config.ts
├── package.json
└── README.md


## 节点
节点	标志
M1	能登录，能看到自己的文档列表
M2	文档增删改查完整可用
M3	搜索 + 标签筛选流畅
M4	AI 对话能正常流式回复
M5	管理员功能 + 权限完整
M6	有测试，体验打磨完，正式上线