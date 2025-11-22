import { Badge } from "@/components/ui/badge";
import { getCourseById } from "@/services/course-service";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    console.log(`Rendering course detail page for ID: ${id}`);
    const course = await getCourseById(id);

    return (
      <div className="h-full max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

          <div className="flex items-center mb-6">
            <Badge variant="secondary" className="text-lg mr-4">
              ฿{parseFloat(course.price).toLocaleString()}
            </Badge>
            {course.duration && (
              <span className="text-gray-600">ระยะเวลา: {course.duration}</span>
            )}
          </div>

          {course.createdAt && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">วันที่เผยแพร่</h2>
              <p className="text-gray-700">
                {new Date(course.createdAt).toLocaleDateString("th-TH")}
              </p>
            </div>
          )}

          {course.instructor ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">ผู้สอน</h2>
              <p className="text-gray-700">{course.instructor}</p>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">ผู้สอน</h2>
              <p className="text-gray-500 italic">ไม่มีข้อมูลผู้สอน</p>
            </div>
          )}

          {course.description ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">รายละเอียด</h2>
              <p className="text-gray-700">{course.description}</p>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">รายละเอียด</h2>
              <p className="text-gray-500 italic">ยังไม่มีคำอธิบายเพิ่มเติม</p>
            </div>
          )}

          <Link
            href="/course"
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            กลับไปหน้ารายการคอร์ส
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in course detail page:", error);
    notFound();
  }
}
