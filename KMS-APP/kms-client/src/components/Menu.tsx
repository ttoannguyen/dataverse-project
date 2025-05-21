import { useNavigate } from "react-router-dom";
import { Button } from "./common/Button";
import { searchDatasets } from "../api/dataverse";
import {
  ChevronDown,
  Home,
  Database,
  Info,
  AlignJustify,
  Newspaper,
} from "lucide-react";

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
  return (
    <div className="flex">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => {
            navigate(item.path);
            item.onClick;
            searchDatasets();
          }}
          className="flex items-center gap-2"
        >
          {item.icon}
          <span>{item.label}</span>
        </Button>
      ))}
    </div>
  );
}

export default Menu;
