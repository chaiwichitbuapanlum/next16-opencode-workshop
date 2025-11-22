import { Badge } from "@/components/ui/badge";
import { getCourses } from "@/services/course-service";
import Link from "next/link";

export default async function AppCourseList() {
  const courses = await getCourses();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 bg-amber-50 mt-4">
      <h2 className="text-3xl font-bold mb-6">
        Course ทั้งหมด (ใช้แบบ dynamic และครอบด้วย Suspense)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id}>
            <Link href={`/course/${course.id}`}>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white cursor-pointer">
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-lg">
                    ฿{parseFloat(course.price).toLocaleString()}
                  </Badge>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
