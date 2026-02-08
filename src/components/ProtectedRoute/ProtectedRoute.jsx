import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationToken";

function ProtectedRoute() {
  const location = useLocation();
  const { token } = useAuth();
  if (!token)
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  return <Outlet />;
}

export default ProtectedRoute;
