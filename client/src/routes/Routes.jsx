import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import { LoginSignUpProtected } from "./LoginSignUpProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import MainPage from "../pages/Mainpage/MainPage";
import Analytics from "../components/Analytics/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },

  {
    path: "/login",
    element: (
      <LoginSignUpProtected>
        <Login />
      </LoginSignUpProtected>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoginSignUpProtected>
        <Signup />
      </LoginSignUpProtected>
    ),
  },
]);
