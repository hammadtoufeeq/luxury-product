import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link , useLocation } from "react-router-dom";
import api from "../api/axios.js";


function Login() {
    const { setIsLoggedIn , setuser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirectMessage = location.state?.message;
    async function handleLogin(e) {
    e.preventDefault()
    let response
    try {
         response = await api.post(
            '/users/login',
            { email, password }
        )
    } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
        setPassword('')
        console.error('Login failed:', err.response?.data || err.message)
        return
    }
    setIsLoggedIn(true)
    setuser(response.data.user)
    navigate('/')
}
return (
    <>
        <div className="product-detail">
            <Link to="/" className="back-btn">Back to Home</Link>
            <h2>Login</h2>
            {redirectMessage && <p className="auth-message">{redirectMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <Link to="/signup" className="auth-link">Don't have an account? Sign up</Link>
            </form>
        </div>
    </>)
}
export default Login; 