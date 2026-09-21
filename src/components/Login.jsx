import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const {setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    function handleLogin(e){
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/')
    }
    return(
    <>
       <div className="product-detail">
        <Link to ="/" className="back-btn">Back to Home</Link>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Enter your email" required />
            <input type="password" placeholder="Enter your password" required />
            <button type="submit">Login</button>
        </form>
       </div>
    </>)
}
export default Login; 