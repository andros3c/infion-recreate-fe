import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext(null);

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
