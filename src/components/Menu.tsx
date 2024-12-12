import React, { useState } from "react";
import { GrMap } from "react-icons/gr";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineStore, MdOutlineLogout, MdLightMode, MdNightlight } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useMenu } from "../context/MenuContext";
import { GetUsername } from "../utils/getUsername";

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [dark, setDark] = useState(false);
  const { menuOpen, toggleMenu } = useMenu();

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      await logout(token);
      navigate("/");
    } catch (error) { }
  };


  return (
    <div
    id="menu"
      className={`${menuOpen ? "w-[13vw] md:w-[5vw]" : "w-[13vw]"
        } h-full fixed bg-gradient-to-br from-pink to-orange dark:from-gray-800 dark:to-gray-800 text-white transition-all`}
    >
      <div className="flex flex-col items-center p-4 gap-2">
        <FaRegCircleUser size={40} color={"#FFFFFF"} />
        {!menuOpen && (
          <>
            <h1>¡Bienvenido/a!</h1>
            <p>{email && GetUsername({email})}</p>
          </>
        )}
        <span className="w-full h-[1px] bg-white bg-opacity-50" />
      </div>

      <div className="flex flex-col justify-between items-center h-5/6">
        <div className="h-full flex flex-col justify-center gap-5">
          <Link to={"/map"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <GrMap className={"#FFFFFF size-6"} />
              {!menuOpen && "Mapa"}
            </div>
          </Link>
          <Link to={"/favorites"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <MdOutlineStore className={"#FFFFFF size-6"} />
              {!menuOpen && "Favoritos"}
            </div>
          </Link>
          <Link to={"/offers"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <IoPricetagOutline className={"#FFFFFF size-6"} />
              {!menuOpen && "Ofertas"}
            </div>
          </Link>
          <Link to={"/stores"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <MdOutlineStore className={"#FFFFFF size-6"} />
              {!menuOpen && "Tiendas"}
            </div>
          </Link>
        </div>

        <div>
          <span
            onClick={handleLogout}
            className="flex items-center p-4 gap-5 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
          >
            <MdOutlineLogout className={"#FFFFFF size-6"} />
            {!menuOpen && "Cerrar sesión"}
          </span>
          <span
            className="flex items-center p-4 gap-5 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
            onClick={darkModeHandler}
          >
            {dark ? (
              <>
                <MdLightMode className="text-white size-6" />
                {!menuOpen && "Modo Claro"}
              </>
            ) : (
              <>
                <MdNightlight className="text-white size-6" />
                {!menuOpen && "Modo Oscuro"}
              </>
            )}
          </span>

          <span
            onClick={toggleMenu}
            className="hidden md:flex w-full border-t justify-center items-center pt-3 cursor-pointer"
          >
            <IoIosArrowBack className={"#FFFFFF size-6"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
