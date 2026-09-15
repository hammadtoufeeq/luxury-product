import products from './data/products.json'
import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const gridRef = useRef(null);
  const [searchTerm, setsearchTerm] = useState(localStorage.getItem("searchTerm") || "")
  const [categoryupdate, setcategoryupdate] = useState(localStorage.getItem("categoryupdate") || "")
  const [selectedProduct, setselectedProduct] = useState(null)
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryupdate === "" || categoryupdate === product.category))
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm)
  }, [searchTerm])
  useEffect(() => {
    localStorage.setItem("categoryupdate", categoryupdate)
  }, [categoryupdate])
  useEffect(() => {
    if (selectedProduct) {
      document.title = selectedProduct.name
    } else {
      document.title = "Luxury Collection"
    }

  }, [selectedProduct])

  return (
    <>

      {selectedProduct ? (
        <div className="product-detail">
          <button className="back-btn" onClick={() => setselectedProduct(null)}>Back</button>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <h2>{selectedProduct.name}</h2>
          <p>Category: {selectedProduct.category}</p>
          <p>Price: ${selectedProduct.price.toLocaleString()}</p>
          <InquiryForm productName={selectedProduct.name} />
        </div>
      ) : (
        <>
          <Navbar onCategoryClick={(cat) => {
            setcategoryupdate(cat)
            gridRef.current.scrollIntoView({ behavior: "smooth" })
          }} />
          <div className="hero">
            <img src="/images/hero4.jpg" alt="Luxury Collection" className="hero-image" />
            <div className="hero-overlay">
              <h1 className="hero-title">Luxury Collection</h1>
            </div>
          </div>
          <div className="controls">
            <SearchBox value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
            <CategoryFilter value={categoryupdate} onChange={(e) => {
              setcategoryupdate(e.target.value)
            }} />
          </div>
          <div className="product-grid" ref={gridRef}>
            {filteredProducts.map(product => {
              return <ProductCard key={product.id} image={product.image} name={product.name} category={product.category} price={product.price} onView={() => setselectedProduct(product)} />
            })}
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img className="product-image" src={props.image} alt={props.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{props.category}</span>
        <h3 className="product-name">{props.name}</h3>
        <p className="product-price">${props.price.toLocaleString()}</p>
        <button className="view-btn" onClick={props.onView}>View</button>
      </div>
    </div>
  )
}

function SearchBox(props) {
  return <input className="search-box" type="text" placeholder="Search luxury items..." value={props.value} onChange={props.onChange} />
}

function CategoryFilter(props) {
  return (
    <select className="category-filter" value={props.value} onChange={props.onChange}>
      <option value="">All Categories</option>
      <option value="Watches">Watches</option>
      <option value="Bags">Bags</option>
      <option value="Perfumes">Perfumes</option>
      <option value="Jewelry">Jewelry</option>
      <option value="Sunglasses">Sunglasses</option>
    </select>
  )
}
function InquiryForm(props) {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [submitted, setsubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Inquiry:", { product: props.productName, name, email })
    setsubmitted(true)
  }

  if (submitted) {
    return <p className="thank-you">Thank you! We'll contact you about {props.productName} soon.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        required
      />
      <button type="submit">Send Inquiry</button>
    </form>
  )
}
function Footer() {
  return (
    <footer className="app-footer">
      <h3>LUXURY COLLECTION</h3>
      <p>Curated excellence, delivered with distinction.</p>
      <p> © 2026 Luxury Collection. All rights reserved.</p>
    </footer>
  )
}
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

export default App