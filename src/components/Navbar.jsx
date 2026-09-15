function Navbar(props) {
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
      </div>
    </nav>
  )

}
export default Navbar;