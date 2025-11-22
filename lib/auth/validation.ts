import * as z from "zod";

// Sign Up Form Schema
export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" })
    .max(50, { message: "ชื่อไม่ควรเกิน 50 ตัวอักษร" })
    .trim(),
  bio: z
    .string()
    .max(500, { message: "ประวัติส่วนตัวไม่ควรเกิน 500 ตัวอักษร" })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email({ message: "กรุณากรอกอีเมลที่ถูกต้อง" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
    .regex(/[a-zA-Z]/, { message: "รหัสผ่านต้องมีตัวอักษรอย่างน้อย 1 ตัว" })
    .regex(/[0-9]/, { message: "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "รหัสผ่านต้องมีสัญลักษณ์พิเศษอย่างน้อย 1 ตัว",
    })
    .trim(),
});

// Sign In Form Schema
export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "กรุณากรอกอีเมลที่ถูกต้อง" })
    .toLowerCase()
    .trim(),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่าน" }).trim(),
});

// Form State Types
export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        bio?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
