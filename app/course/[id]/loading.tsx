import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function CourseDetailLoading() {
  return (
    <div className="h-full max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-4">
          <Skeleton className="h-10 w-3/4" />
          <Spinner className="ml-4" />
        </div>

        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-1/4 mr-4" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-6 w-1/6 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-6 w-1/6 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-6 w-1/6 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <Skeleton className="h-10 w-1/3 mt-6" />
      </div>
    </div>
  );
}
