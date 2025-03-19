import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (including role)
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      setUser(decodedToken); // Set user with decoded info (including role)
      setToken(savedToken);

    }
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setUser({ ...decodedToken });  // Ensure a new object reference
    setToken(token);
    localStorage.setItem("token", token);
  };
  

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,setUser,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
