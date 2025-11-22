import "server-only";
import { cookies } from "next/headers";
import type { Session } from "@/lib/types";

// Mock session functions for demo purposes
// In production, you would implement proper JWT signing and database storage

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const cookieStore = await cookies();

  // In production: encrypt this session data with JWT
  const sessionData = JSON.stringify({
    userId,
    expiresAt: expiresAt.toISOString(),
  });

  cookieStore.set("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    // In production: decrypt and verify JWT
    const sessionData = JSON.parse(sessionCookie);
    const expiresAt = new Date(sessionData.expiresAt);

    if (expiresAt < new Date()) {
      return null;
    }

    return {
      userId: sessionData.userId,
      expiresAt,
    };
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function updateSession(): Promise<void> {
  const session = await getSession();

  if (!session) {
    return;
  }

  await createSession(session.userId);
}
