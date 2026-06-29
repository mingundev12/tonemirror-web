import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const login = !!sessionStorage.getItem("admin_token");
    
    if(!login) {
        return <Navigate to="/adminLogin" replace/>
    }

    return children;
}