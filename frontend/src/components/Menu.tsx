import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Database, Info, AlignJustify, Newspaper } from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home size={16} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <Info size={16} />,
    label: "About",
    path: "/about",
  },
  {
    icon: <Database size={16} />,
    label: "Dataverse",
    path: "/dataverse",
  },
  {
    icon: <AlignJustify size={16} />,
    label: "Topics",
    path: "/topics",
  },
  {
    icon: <Newspaper size={16} />,
    label: "Blog",
    path: "/blog",
  },
];

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-2">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          onClick={() => navigate(item.path)}
          className={`flex items-center px-6 py-2 rounded-md gap-2 transition-colors duration-300 animate-fade-in ${
            location.pathname === item.path
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default Menu;
