import AppCourseList from '@/components/AppCourseList';
import AppUserList from '@/components/AppUserList';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';

export default async function CoursePage() {

  return (
    <div className="h-full max-w-7xl mx-auto px-4 mt-4">
      
      <AppUserList />

      <Suspense fallback={<Spinner />}>
        <AppCourseList />
      </Suspense>
      
    </div>
  );
}
