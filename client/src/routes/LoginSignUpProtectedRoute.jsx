import { Navigate } from "react-router-dom";

export function LoginSignUpProtected({ children }) {
  const isAuthenticated = !!localStorage.getItem("user");


  return isAuthenticated ? <Navigate to="/" /> : children;
}
