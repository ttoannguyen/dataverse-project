import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
