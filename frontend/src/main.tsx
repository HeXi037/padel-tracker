import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MatchTracker from "./pages/MatchTracker";
import Home from "./pages/Home"; // assume you have one

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/match", element: <MatchTracker /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
