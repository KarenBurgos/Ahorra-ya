import React, { createContext, useContext, useState, ReactNode } from "react";

// Definir los tipos de contexto
interface MenuContextType {
  menuOpen: boolean;
  toggleMenu: () => void;
}

// Crear el contexto con un valor por defecto
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Componente proveedor del contexto
interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(true); // Estado del menú lateral

  const toggleMenu = () => setMenuOpen((prev) => !prev); // Función para alternar el estado del menú

  return (
    <MenuContext.Provider value={{ menuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook para acceder al contexto
export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
