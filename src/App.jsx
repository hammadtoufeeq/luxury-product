import products from './data/products.json'
import ProductCard from './components/ProductCard'
import SearchBox from './components/SearchBox'
import CategoryFilter from './components/CategoryFilter'
import InquiryForm from './components/InquiryForm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import DetailCard from './components/DetailCard'
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
        <DetailCard>
          <button className="back-btn" onClick={() => setselectedProduct(null)}>Back</button>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <h2>{selectedProduct.name}</h2>
          <p>Category: {selectedProduct.category}</p>
          <p>Price: ${selectedProduct.price.toLocaleString()}</p>
          <InquiryForm productName={selectedProduct.name} />
        </DetailCard>
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











export default App