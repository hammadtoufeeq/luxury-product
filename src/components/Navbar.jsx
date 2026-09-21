import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
function Navbar(props) {
  const {isLoggedIn , setIsLoggedIn} = useContext(AuthContext)
  return (
    <nav className='navbar'>
      <h1 className='navbar-brand'>Luxury Collection</h1>
      <div className='navbar-links'>
        <span onClick={() => { props.onCategoryClick("") }}>All</span>
        <span onClick={() => { props.onCategoryClick("Watches") }}>Watches</span>
        <span onClick={() => { props.onCategoryClick("Bags") }}>Bags</span>
        <span onClick={() => { props.onCategoryClick("Perfumes") }}>Perfumes</span>
        <span onClick={() => { props.onCategoryClick("Jewelry") }}>Jewelry</span>
        <span onClick={() => { props.onCategoryClick("Sunglasses") }}>Sunglasses</span>
        {isLoggedIn ? (
          <span onClick={()=> setIsLoggedIn(false)}>Logout</span>
        ):(<Link to = "/login">Login</Link>)}
      </div>
    </nav>
  )

}
export default Navbar
