// Definir los tipos de contexto
interface UsernameProps {
    email: string;
  }
  
  export const GetUsername = ({email}:UsernameProps):string => {
    const atIndex = email.indexOf("@");
    return email.slice(0, atIndex);
  };