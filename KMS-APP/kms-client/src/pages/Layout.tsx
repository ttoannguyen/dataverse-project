import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-20 mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
