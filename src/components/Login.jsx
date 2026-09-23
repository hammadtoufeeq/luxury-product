import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function Login() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleLogin(e) {
    e.preventDefault()
    try {
         await axios.post(
            'http://localhost:3002/users/login',
            { email, password },
            { withCredentials: true }
        )
    } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
        setPassword('')
        console.error('Login failed:', err.response?.data || err.message)
        return
    }
    setIsLoggedIn(true)
    navigate('/')
}
return (
    <>
        <div className="product-detail">
            <Link to="/" className="back-btn">Back to Home</Link>
            <h2>Login</h2>
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