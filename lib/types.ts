export interface Course {
  id: string;
  title: string;
  price: number;
  description?: string;
  duration?: string;
  instructor?: string;
}

export interface User {
  id: string;
  name: string;
  bio: string;
}
