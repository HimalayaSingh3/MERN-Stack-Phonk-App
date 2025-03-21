import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to log in the user and store credentials
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("isAdmin", JSON.stringify(userData.isAdmin));

    // Redirect based on role
    navigate(userData.isAdmin ? "/admin" : "/home");
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // Load user from local storage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

    if (token) {
      setUser({ token, isAdmin });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
