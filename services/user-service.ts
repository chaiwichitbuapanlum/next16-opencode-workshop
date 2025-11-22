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
