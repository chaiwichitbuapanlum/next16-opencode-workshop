/**
 * Service รวมฟังก์ชันดึงข้อมูลคอร์สจาก mock API สำหรับใช้งานใน Next.js 16 App Router.
 * - รองรับการเรียกใช้จาก server components และ server actions
 * - ไม่ได้บังคับ caching ภายใน ให้ caller ควบคุมผ่าน fetch options หรือ cacheLife()
 */
import { Course } from "@/lib/types";

const API_URL = "https://6920694231e684d7bfccf095.mockapi.io/api/v1/course";

/**
 * ดึงรายการคอร์สทั้งหมดจากปลายทาง API และคืนค่าในรูปแบบ Course[].
 * ใช้สำหรับหน้าแสดงคอร์สหรือ sections ที่ต้องการข้อมูลสรุป โดยสามารถเพิ่มนโยบาย cache
 * ในผู้เรียก (caller) ตามแนวทาง Cache Components ได้เอง
 *
 * @returns Promise<Course[]> รายการคอร์สทั้งหมด
 * @throws Error เมื่อปลายทางตอบกลับไม่สำเร็จหรือ fetch ล้มเหลว
 */
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

/**
 * ดึงรายละเอียดคอร์สตามรหัสเฉพาะ เหมาะกับหน้า course detail หรือ dynamic route.
 * มีการตรวจสอบโครงสร้างข้อมูลขั้นต่ำ (title และ price) ก่อนคืนค่า
 * และปล่อยให้ caller ควบคุม caching / revalidation
 *
 * @param id รหัสคอร์สที่ต้องการดึงข้อมูล
 * @returns Promise<Course> ข้อมูลคอร์สที่ผ่านการตรวจสอบแล้ว
 * @throws Error เมื่อปลายทางตอบกลับไม่สำเร็จ ข้อมูลไม่ครบ หรือเกิดข้อผิดพลาดขณะ fetch
 */
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
