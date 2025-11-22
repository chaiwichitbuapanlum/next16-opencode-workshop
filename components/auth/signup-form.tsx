"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { signUp } from "@/app/actions/auth";
import type { SignUpFormState } from "@/lib/auth/validation";

export default function SignUpForm() {
  const [state, action, pending] = useActionState<SignUpFormState, FormData>(
    signUp,
    undefined,
  );

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">สมัครสมาชิก</h1>
        <p className="text-muted-foreground">
          กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีใหม่
        </p>
      </div>

      <Form action={action}>
        <FormField>
          <Label htmlFor="name">ชื่อ</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="ชื่อของคุณ"
            required
          />
          <FormMessage errors={state?.errors?.name} />
        </FormField>

        <FormField>
          <Label htmlFor="bio">ประวัติส่วนตัว (ไม่บังคับ)</Label>
          <textarea
            id="bio"
            name="bio"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="เล่าเกี่ยวกับตัวคุณ..."
          />
          <FormDescription>
            บอกเล่าเกี่ยวกับตัวคุณ (สูงสุด 500 ตัวอักษร)
          </FormDescription>
          <FormMessage errors={state?.errors?.bio} />
        </FormField>

        <FormField>
          <Label htmlFor="email">อีเมล</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@example.com"
            required
          />
          <FormMessage errors={state?.errors?.email} />
        </FormField>

        <FormField>
          <Label htmlFor="password">รหัสผ่าน</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="รหัสผ่านของคุณ"
            required
          />
          <FormDescription>
            รหัสผ่านต้องมี อย่างน้อย 8 ตัวอักษร ตัวอักษร ตัวเลข
            และสัญลักษณ์พิเศษ
          </FormDescription>
          <FormMessage errors={state?.errors?.password} />
        </FormField>

        {state?.message && (
          <div className="text-sm text-red-500 text-center">
            {state.message}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "กำลังสร้างบัญชี..." : "สร้างบัญชี"}
        </Button>
      </Form>

      <div className="text-center text-sm">
        มีบัญชีแล้ว?{" "}
        <Link href="/auth/signin" className="underline">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
