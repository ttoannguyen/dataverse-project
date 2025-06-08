// src/pages/admin/Users.tsx
const AdminUsers = () => {
  // Dữ liệu giả
  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
    { id: 2, name: "Trần Thị B", email: "b@example.com" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
