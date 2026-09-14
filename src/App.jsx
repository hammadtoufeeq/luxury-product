import products from './data/products.json'
import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setsearchTerm] = useState("")
  const [categoryupdate, setcategoryupdate] = useState("")
  const [selectedProduct, setselectedProduct] = useState(null)
  const filteredProducts = products.filter(product=>product.name.toLowerCase().includes(searchTerm.toLowerCase())&&(categoryupdate==="" || categoryupdate===product.category))

  return (
    <>
      {selectedProduct ? (
        <div className="product-detail">
          <button className="back-btn" onClick={() => setselectedProduct(null)}>Back</button>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <h2>{selectedProduct.name}</h2>
          <p>Category: {selectedProduct.category}</p>
          <p>Price: ${selectedProduct.price.toLocaleString()}</p>
          <InquiryForm productName={selectedProduct.name}/>
        </div>
      ) : (
        <>
          <div className="hero">
            <img src="/images/hero4.jpg" alt="Luxury Collection" className="hero-image" />
            <div className="hero-overlay">
              <h1 className="hero-title">Luxury Collection</h1>
            </div>
          </div>
          <div className="controls">
            <SearchBox value={searchTerm} onChange={(e)=> setsearchTerm(e.target.value)} />
            <CategoryFilter value={categoryupdate} onChange ={(e)=>{
              setcategoryupdate(e.target.value )
            }}   />
          </div>
          <div className="product-grid">
            {filteredProducts.map(product => {
              return <ProductCard key={product.id} image={product.image} name={product.name} category={product.category} price={product.price} onView={() => setselectedProduct(product)} />
            })}
          </div>
        </>
      )}
    </>
  )
}

function ProductCard(props){
  return(
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

function SearchBox(props){
 return <input className="search-box" type="text" placeholder="Search luxury items..." value={props.value} onChange={props.onChange} />
}

function CategoryFilter(props){
  return(
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

export default App