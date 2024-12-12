import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LuLoader } from "react-icons/lu";
import { signup } from "../api/auth";

const SetPassword = () => {
  const { email } = useLocation().state as { email: string };
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  //Set password and navigate to login page
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      await signup({ username: email, password });
      setLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#FF8E9D] to-[#FFA48B] h-screen flex flex-col justify-center items-center overflow-hidden">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="absolute bg-white w-[70vw] h-[70%] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden text-white z-20 shadow-form"
      >
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="md:w-2/4 w-10/12" />
        </div>
        <div className="flex flex-col justify-evenly items-center bg-pink rounded-2xl p-5">
          <div className="flex flex-col text-center gap-2 md:gap-5">
            <h1 className="md:text-3xl text-wrap line-clamp-2">Establece una contraseña</h1>
            <h2 className="text-sm md:text-lg text-light-pink-text ">{email}</h2>
          </div>
          <div className="md:w-3/5 flex flex-col gap-2">
            <p className="pt-5 text-base">Contraseña</p>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-white bg-transparent rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="pt-5">Confirmar contraseña</p>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-white bg-transparent rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-3/5 flex flex-col">
            <button type="submit" className="bg-[#FF8E9D] py-3 rounded-lg mb-3">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </form>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center gap-4 items-center bg-black bg-opacity-50 z-30">
          <p className="text-white text-2xl">Creando usuario</p>
          <LuLoader className="text-white size-10 animate-spin-slow"/>
        </div>
      )}
      <span className="rounded-full size-[30vw] bg-white opacity-25 absolute -bottom-[20%] -left-20 z-10"></span>
      <span className="rounded-full size-[30vw] bg-white opacity-25 absolute -top-[30%] -right-40 z-10"></span>
      <span className="rounded-full size-[20vw] bg-white opacity-25 absolute top-[10%] -right-40 z-10"></span>
    </div>
  );
};

export default SetPassword;
