import { Badge } from '@/components/ui/badge';
import { getUsers } from '@/services/user-service';

export default async function AppUserList() {
  const users = await getUsers();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 bg-green-200">
      <h2 className="text-3xl font-bold mb-6">User ทั้งหมด ( ใช้ use cache และ cacheLife() ในฟังก์ชัน Service)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3">{user.name}</h3>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg">
                {user.bio}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}