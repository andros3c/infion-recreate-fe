import { useAuth } from "@/hooks/useAuth";
import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const values = useAuth();
  return (
    <AuthContext.Provider value={{ ...values }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthContextProvider };
