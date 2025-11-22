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
  bio: string;
}
