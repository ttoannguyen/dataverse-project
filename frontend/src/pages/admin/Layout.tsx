// src/pages/admin/Layout.tsx
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold" : "text-gray-700"
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
