export default async function UserPage() {

  const userResponse = await fetch(
    "https://6920694231e684d7bfccf095.mockapi.io/api/v1/user"
  );
  const user = (await userResponse.json()) as { id: number; name: string; bio: string }[]

  return (
    <div className="h-full max-w-7xl mx-auto px-4 mt-4">
      <h1 className="mb-4 text-4xl">ใช้แบบ dynamic ร่วมกับ loading.tsx</h1>
      {user.map((item) => (
        <div key={item.id} className="p-4 mb-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
          <p className="text-gray-600">{item.bio}</p>
        </div>
      ))}
    </div>
  );
}
