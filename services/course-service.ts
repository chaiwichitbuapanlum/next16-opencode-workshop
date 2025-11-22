import { Course } from "@/lib/types";

const API_URL = "https://6920694231e684d7bfccf095.mockapi.io/api/v1/course";

export async function getCourses(): Promise<Course[]> {
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

export async function getCourseById(id: string): Promise<Course> {
  try {
    console.log(`Fetching course with ID: ${id}`);
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Course data fetched:`, data);

    // Ensure data has expected structure
    if (!data || !data.title || !data.price) {
      throw new Error(`Invalid course data received for id: ${id}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching course by id:", error);
    throw error;
  }
}
