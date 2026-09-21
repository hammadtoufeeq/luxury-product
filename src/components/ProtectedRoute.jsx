import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
function ProtectedRoute(props){
const {isLoggedIn} = useContext(AuthContext);
if(!isLoggedIn){
    alert("You need to Login First")
    return <Navigate to= "/login"/>
}
  return props.children
}
export default ProtectedRoute