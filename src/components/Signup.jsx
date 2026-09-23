import {useState} from 'react'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'
function Signup(){
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [name, setname] = useState("")
const navigate = useNavigate();
async function handlesignup(e){
  e.preventDefault();
  try{
   await axios.post('http://localhost:3002/users/signup', { name, email, password });
   
  }catch(error){
   return console.error('Signup failed ' , error.message)
  }
  navigate('/login')
}
return (
    <>
        <div className="product-detail">
            <Link to="/" className="back-btn">Back to Home</Link>
            <h2>Sign up</h2>
            <form onSubmit={handlesignup}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <Link to="/login" className="auth-link">Already have an account? Login</Link>
            </form>
        </div>
    </>)
}
export default Signup