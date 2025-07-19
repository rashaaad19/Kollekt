import { Navigate } from "react-router-dom";
import useStore from "../store/store";

const ProtectedRoute = ({ children }) => {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) {
  return <Navigate to={'/'} replace/>
  }
  return <>{children}</>;
};

export default ProtectedRoute;
