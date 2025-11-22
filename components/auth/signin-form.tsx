"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { signIn } from "@/app/actions/auth";
import type { SignInFormState } from "@/lib/auth/validation";

export default function SignInForm() {
  const [state, action, pending] = useActionState<SignInFormState, FormData>(
    signIn,
    undefined,
  );

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
        <p className="text-muted-foreground">
          กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
        </p>
      </div>

      <Form action={action}>
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
          <Input id="password" name="password" type="password" required />
          <FormMessage errors={state?.errors?.password} />
        </FormField>

        {state?.message && (
          <div className="text-sm text-red-500 text-center">
            {state.message}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
      </Form>

      <div className="text-center text-sm">
        ยังไม่มีบัญชี?{" "}
        <Link href="/auth/signup" className="underline">
          สมัครสมาชิก
        </Link>
      </div>
    </div>
  );
}
