import { useNavigate, useLocation } from "react-router-dom";
import { searchDatasets } from "../api/dataverse";
import { Button } from "./ui/button";
import { Home, Database, Info, AlignJustify, Newspaper } from "lucide-react";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick: () => void;
};

const menuItems: MenuItem[] = [
  {
    icon: <Home size={16} />,
    label: "Home",
    path: "/",
    onClick: () => console.log("Home"),
  },
  {
    icon: <Info size={16} />,
    label: "About",
    path: "/about",
    onClick: () => console.log("About"),
  },
  {
    icon: <Database size={16} />,
    label: "Dataverse",
    path: "/dataverse",
    onClick: () => console.log("Dataverse"),
  },
  {
    icon: <AlignJustify size={16} />,
    label: "Topics",
    path: "/topics",
    onClick: () => console.log("Topics"),
  },
  {
    icon: <Newspaper size={16} />,
    label: "Blog",
    path: "/blog",
    onClick: () => console.log("Blog"),
  },
];

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          variant={location.pathname === item.path ? "default" : "ghost"}
          onClick={() => {
            navigate(item.path);
            item.onClick();
            if (item.path === "/dataverse") {
              searchDatasets();
            }
          }}
          className={`flex items-center !px-6 rounded-none gap-2 transition-colors duration-200 animate-fade-in ${
            location.pathname === item.path
              ? "bg-[var(--blue-6)] text-[var(--blue-12)] hover:bg-[var(--blue-8)]"
              : "text-[var(--blue-1)] hover:bg-[var(--blue-3)] hover:text-[var(--blue-11)]"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Button>
      ))}
    </div>
  );
}

export default Menu;
