import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function ProtectedRoute(props) {
  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === null) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "You need to login first" }}
      />
    )
  }
  return props.children
}
export default ProtectedRoute