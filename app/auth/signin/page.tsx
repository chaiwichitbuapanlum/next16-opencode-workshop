import SignInForm from "@/components/auth/signin-form";

export const metadata = {
  title: "เข้าสู่ระบบ",
  description: "เข้าสู่ระบบเพื่อเข้าใช้งานแอพพลิเคชัน",
};

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <SignInForm />
    </div>
  );
}
