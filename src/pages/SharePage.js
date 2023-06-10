import { Navbar, Sidebar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const SharePage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};
export default SharePage;
