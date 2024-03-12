import { Navigate } from "react-router-dom";
import App from "../App";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? <App /> : <Navigate to="login" />;
};

export default ProtectedRoute;
