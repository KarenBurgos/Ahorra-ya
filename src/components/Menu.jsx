import React, { useState } from "react";
import { GrMap } from "react-icons/gr";
import { IoStorefront } from "react-icons/io5";
import { MdOutlineLogout, MdLightMode, MdOutlineStore } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { MdFavoriteBorder } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

const SideMenu = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      await logout(token);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="w-[13vw] h-screen fixed bg-gradient-to-br from-pink to-orange dark:from-gray-800 dark:to-gray-800 text-white ">
      <div className="flex flex-col items-center p-4 gap-2">
        <FaRegCircleUser size={40} color={"#FFFFFF"} />
        <h1>¡Bienvenido/a!</h1>
        <p>{email}</p>
        <span className="w-full h-[1px] bg-white bg-opacity-50" />
      </div>

      <div className="flex flex-col justify-between h-5/6 ">
        <div className="h-full flex flex-col justify-center pl-3 gap-5">
          <Link to={"/map"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <GrMap size={20} color={"#FFFFFF"} />
              Mapa
            </div>
          </Link>
          <Link to={"/favorites"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <MdFavoriteBorder size={20} color={"#FFFFFF"} />
              Favoritos
            </div>
          </Link>
          <Link to={"/offers"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <IoPricetagOutline size={20} color={"#FFFFFF"} />
              Ofertas
            </div>
          </Link>
          <Link to={"/stores"}>
            <div className="flex items-center p-4 gap-5 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700 hover:text-red-200">
              <MdOutlineStore size={20} color={"#FFFFFF"} />
              Tiendas
            </div>
          </Link>
        </div>
        <div>
          <div
            onClick={handleLogout}
            className="flex items-center p-4 gap-5 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
          >
            <MdOutlineLogout size={20} color={"#FFFFFF"} />
            Cerrar sesión
          </div>
          <div
            className="flex items-center p-4 gap-5 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
            onClick={darkModeHandler}
          >
            <MdLightMode size={20} color={"#FFFFFF"} />
            Modo claro/oscuro
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
