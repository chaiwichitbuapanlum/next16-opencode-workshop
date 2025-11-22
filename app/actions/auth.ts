"use server";

import { redirect } from "next/navigation";
import { SignUpFormSchema, SignInFormSchema } from "@/lib/auth/validation";
import type { SignUpFormState, SignInFormState } from "@/lib/auth/validation";
import { createSession } from "@/lib/auth/session";
import { createUser, findUserByEmail } from "@/services/user-service";

// Mock database - in production, replace with real database calls
const mockUsers: Array<{
  id: string;
  name: string;
  bio?: string;
  email: string;
  password: string;
}> = [];

// Mock function to hash password (in production, use bcrypt or similar)
function hashPassword(password: string): string {
  // In production: return await bcrypt.hash(password, 10)
  return `hashed_${password}`;
}

// Mock function to compare password (in production, use bcrypt or similar)
function comparePassword(password: string, hash: string): boolean {
  // In production: return await bcrypt.compare(password, hash)
  return `hashed_${password}` === hash;
}

// Sign Up Server Action
export async function signUp(
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  // 1. Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, bio, email, password } = validatedFields.data;
  const normalizedBio = bio && bio.trim().length > 0 ? bio.trim() : undefined;

  try {
    // 2. Check if user already exists
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      return {
        message: "ผู้ใช้นี้มีอยู่ในระบบแล้ว กรุณาใช้อีเมลอื่น",
      };
    }

    // 3. Hash password and create user
    const hashedPassword = hashPassword(password);
    const createdUser = await createUser({
      name,
      bio: normalizedBio,
      email,
      password: hashedPassword,
    });

    const userId = createdUser.id;

    const newUser = {
      id: userId,
      name: createdUser.name,
      bio: createdUser.bio ?? normalizedBio,
      email: createdUser.email,
      password: hashedPassword,
    };

    // 4. Save user to mock database
    mockUsers.push(newUser);

    // 5. Create session
    await createSession(userId);

    console.log("New user created:", {
      id: userId,
      name: createdUser.name,
      email: createdUser.email,
    });
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      message: "เกิดข้อผิดพลาดในการสร้างบัญชี กรุณาลองใหม่อีกครั้ง",
    };
  }

  // 6. Redirect user
  redirect("/");
}

// Sign In Server Action
export async function signIn(
  state: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  // 1. Validate form fields
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // 2. Verify user data exists in remote storage
    const remoteUser = await findUserByEmail(email);
    if (!remoteUser) {
      return {
        message: "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
      };
    }

    // 3. Find user by email in local session store
    const user = mockUsers.find((item) => item.email === remoteUser.email);
    if (!user) {
      return {
        message: "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
      };
    }

    // 4. Verify password
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        message: "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
      };
    }

    // 5. Create session
    await createSession(user.id);

    console.log("User signed in:", {
      id: user.id,
      email,
      verifiedWith: remoteUser.id,
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง",
    };
  }

  // 5. Redirect user
  redirect("/");
}

// Sign Out Server Action
export async function signOut(): Promise<void> {
  const { deleteSession } = await import("@/lib/auth/session");
  await deleteSession();
  redirect("/auth/signin");
}
