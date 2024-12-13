// src/components/LoadingIndicator.tsx
import { LuLoader } from "react-icons/lu";

const LoadingScreen = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center gap-4 items-center bg-black bg-opacity-50 z-30">
      <p className="text-white text-2xl">Cargando</p>
      <LuLoader className="text-white size-10 animate-spin-slow" />
    </div>
  );
};

export default LoadingScreen;
