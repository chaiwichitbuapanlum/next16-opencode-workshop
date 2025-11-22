import { getCourseById } from "@/services/course-service";

export default async function TestCoursePage() {
  try {
    // Test with course ID "1"
    const course = await getCourseById("1");

    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Test Course Data</h1>
        <div className="bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(course, null, 2)}</pre>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Error Testing Course
        </h1>
        <div className="bg-red-100 p-4 rounded">
          <pre>{error instanceof Error ? error.message : String(error)}</pre>
        </div>
      </div>
    );
  }
}
