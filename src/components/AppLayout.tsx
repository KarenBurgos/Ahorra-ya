import { Layout } from "antd";
import SideMenu from "./Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMenu } from "../context/MenuContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { menuOpen } = useMenu();

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <ToastContainer />
      <div className={ `${menuOpen ? "w-[13vw] md:w-[5vw]" : "w-[13vw]"} flex-shrink-0 w-full max-w-[13vw]`}>
        <SideMenu />
      </div>
      <div className="flex-grow">{children}</div>
    </Layout>
  );
};

export default AppLayout;
