import { assets } from "../assets/assets";
import Menu from "./Menu";

function Header() {
  return (
    <div className="bg-[#292d56]">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex items-center py-10 gap-4">
          <img src={assets.LogoCTU} alt="Logo CTU" className="w-16 h-16" />
          <div className="text-4xl text-white font-semibold">
            Dataverse - CTU
          </div>
        </div>
      </div>
      <div className="bg-[#373c6a]">
        <div className="max-w-[1080px] mx-auto">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Header;
