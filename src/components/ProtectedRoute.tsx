import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { ProtectedRouteProps } from "../types/components";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
