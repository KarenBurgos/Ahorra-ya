// src/pages/Login.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import logo from "../assets/img/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../interfaces/LoginFormData";
import { useGoogleLogin } from "@react-oauth/google";
import { getUserByEmail, login, loginWithGoogle } from "../api/auth";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "../components/loadingScreen";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await login(formData);
      localStorage.setItem("token", token);
      localStorage.setItem("email", formData.email);
      setLoading(false);
      navigate("/map");
    } catch (error) {
      setLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (accessToken) => {
      setLoading(true); 
      try {
        const userData = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${accessToken.access_token}`,
            },
          }
        ).then((res) => res.json());

        const user = await getUserByEmail(userData.email);
        if (user) {
          const token = await loginWithGoogle({ email: userData.email });
          localStorage.setItem("token", token);
          localStorage.setItem("email", userData.email);
          navigate("/map");
        } else {
          navigate("/signin", { state: { email: userData.email } });
        }
      } catch (error) {
        setLoading(false); 
      }
    },
  });

  return (
    <div className="relative bg-gradient-to-b from-[#FF8E9D] to-[#FFA48B] h-screen flex flex-col justify-center items-center overflow-hidden">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="absolute bg-white w-[80vw] md:w-[70vw] h-[70%] grid grid-cols-1 md:grid-cols-2 rounded-2xl p-5overflow-hidden text-white z-20 shadow-form"
      >
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-2/4" />
        </div>
        <div className="flex flex-col justify-evenly items-center bg-[#F9546B] rounded-2xl">
          <div className="py-5 md:py-0">
            <h1 className="text-2xl md:text-3xl">Inicio de sesión</h1>
            <h2 className="text-sm md:text-base text-center">¡Bienvenido!</h2>
          </div>
          <div className="w-4/5 md:w-3/5">
            <p>Correo</p>
            <input
              type="text"
              name="email"
              className="w-full p-2 border border-white border-opacity-50 bg-transparent rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="pt-5">Contraseña</p>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-white border-opacity-50 bg-transparent rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-4/5 md:w-3/5 flex flex-col">
            <button type="submit" className="bg-[#ff8c96] py-3 rounded-lg ">
              Iniciar Sesión
            </button>
            <span className="flex gap-2 justify-center items-center my-4">
              <span className="h-[1px] w-full bg-white" />
              <p>o</p>
              <span className="h-[1px] w-full bg-white" />
            </span>
            <button
              className="flex flex-row justify-center items-center gap-2 bg-white text-black p-3 rounded-lg relative md:mb-0 mb-10"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                loginGoogle();
              }}
            >
              <span className="z-10 left-3 ">
                <FcGoogle size={25} />
              </span>
              Iniciar sesión con Google
            </button>
          </div>
        </div>
      </form>

      {loading && <LoadingScreen />}
      
      <span className="rounded-full size-[30vw] bg-white opacity-25 absolute -bottom-[20%] -left-20 z-10"></span>
      <span className="rounded-full size-[30vw] bg-white opacity-25 absolute -top-[30%] -right-40 z-10"></span>
      <span className="rounded-full size-[20vw] bg-white opacity-25 absolute top-[10%] -right-40 z-10"></span>
    </div>
  );
};

export default Login;
