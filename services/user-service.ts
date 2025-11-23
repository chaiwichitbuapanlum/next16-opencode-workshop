import { User } from "@/lib/types";
import { cacheLife } from "next/cache";

const API_URL = "https://6920694231e684d7bfccf095.mockapi.io/api/v1/user";

type CreateUserPayload = Pick<User, "name" | "email"> & {
  bio?: string;
  password: string;
};

export type UserQuery = {
  email?: string;
};

export async function getUsers(): Promise<User[]> {
  "use cache";
  cacheLife("minutes");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await fetch(
      `${API_URL}?email=${encodeURIComponent(email)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User[] = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

/**
 * ดึงข้อมูลผู้ใช้เฉพาะรายตามรหัส ID พร้อมรองรับ caching ฝั่ง server component.
 * ควรใช้ร่วมกับ Suspense หรือ partial prerendering ของ Next.js 16 เมื่อข้อมูลถูกแสดงในหน้า dynamic
 *
 * @param id รหัสผู้ใช้ใน mock API
 * @returns Promise<User> ข้อมูลผู้ใช้ที่ผ่านการตรวจสอบโครงสร้างแล้ว
 * @throws Error เมื่อปลายทางตอบไม่สำเร็จหรือข้อมูลที่ได้ไม่ครบถ้วน
 */
export async function getUserById(id: string): Promise<User> {
  "use cache";
  cacheLife("minutes");

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User = await response.json();

    if (!data || !data.id || !data.email) {
      throw new Error(`Invalid user data received for id: ${id}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
}
