import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationToken";

function AuthRoute({ children }) {
  const { token } = useAuth();

  return token ? <Navigate to="/" replace /> : children;
}

export default AuthRoute;
