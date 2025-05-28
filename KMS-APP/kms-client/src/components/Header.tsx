import { assets } from "../assets/assets";
import Menu from "./Menu";
import useAuth from "../hooks/useAuth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-[#292d56]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center py-6 gap-4">
          <img src={assets.LogoCTU} alt="Logo CTU" className="w-16 h-16" />
          <div className="text-3xl text-white font-semibold">
            Dataverse - CTU
          </div>
        </div>
      </div>
      <div className="bg-[#373c6a]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Menu />
          {isAuthenticated ? (
            <Button
              onClick={logout}
              className="bg-red-500 text-white hover:bg-red-600 px-6 py-2"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-red-500 text-white hover:bg-red-600 px-6 py-2"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
