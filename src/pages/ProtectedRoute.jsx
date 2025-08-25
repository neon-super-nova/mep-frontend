import { Navigate } from "react-router-dom";
import { getUserId } from "../context/decodeToken";

export default function ProtectedRoute({ children }) {
  const userId = getUserId();

  if (!userId) {
    return <Navigate to="/" replace />;
  }
  return children;
}
