export interface Course {
  id: string;
  title: string;
  price: string;
  description?: string;
  duration?: string;
  instructor?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  bio?: string;
  email: string;
}

export interface AuthUser extends User {
  password?: string;
}

export interface Session {
  userId: string;
  expiresAt: Date;
}
