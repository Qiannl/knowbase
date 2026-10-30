// zod schema 表单校验规则  type类型为了在写代码时校验，而schema是为了在运行时真实校验
import { z } from "zod";

// 注册
export const loginSchema = z.object({
  username: z.string().min(1, "用户名不能为空"),
  password: z.string().min(6, "密码至少为6位"),
});
export type LoginInput = z.infer<typeof loginSchema>;

//【管理员新增用户】
export const addUserSchema = z.object({
  username: z
    .string()
    .min(1, "用户名至少2个字符")
    .max(30, "用户名最多30个字符"),
  nickname: z.string().min(1, "昵称至少2个字符").max(30, "昵称最多30个字符"),
  email: z.string().email("请输入正确的邮箱"),
  password: z
    .string()
    .min(6, "密码至少为6位")
    .max(30, "密码最多30位")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "密码必须同时包含字母和数字"),
  confirmPassword: z.string(),
  role: z.string().min(1, "请选择用户角色"),
  bio: z.string(),
})
.refine(
  (data) => {
    return data.password === data.confirmPassword;
  },
  {
    message: "密码不一致",
    path: ["confirmPassword"],
  }
)
;
export type AddUserInput = z.infer<typeof addUserSchema>;
