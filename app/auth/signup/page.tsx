import SignUpForm from "@/components/auth/signup-form";

export const metadata = {
  title: "สมัครสมาชิก",
  description: "สร้างบัญชีใหม่เพื่อเริ่มใช้งานแอพพลิเคชัน",
};

export default function SignUpPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <SignUpForm />
    </div>
  );
}
