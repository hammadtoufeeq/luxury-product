import Navbar from './Navbar'
import SearchBox from './SearchBox'
import CategoryFilter from './CategoryFilter'
import products from '../data/products.json'
import ProductCard from './ProductCard'
import Footer from './Footer'
import useLocalStorage from '../hooks/useLocalStorage'
import { useState, useRef, useMemo , useCallback } from 'react'
function HomePage() {
  const gridRef = useRef(null)
  const [searchTerm, setsearchTerm] = useLocalStorage("searchTerm", "")
  const [categoryupdate, setcategoryupdate] = useState("")

  const filteredProducts = useMemo(() =>
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryupdate === "" || categoryupdate === product.category)
    ), [searchTerm, categoryupdate])
  const handleCategoryClick = useCallback((cat) => {
    setcategoryupdate(cat)
    gridRef.current.scrollIntoView({ behavior: "smooth" })
  }, [])
     document.title = "Luxury Product"


  return (
    <>
      <Navbar onCategoryClick={handleCategoryClick} />
      <div className="hero">
        <img src="/images/hero4.jpg" alt="Luxury Collection" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Luxury Collection</h1>
        </div>
      </div>
      <div className="controls">
        <SearchBox value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
        <CategoryFilter value={categoryupdate} onChange={(e) => setcategoryupdate(e.target.value)} />
      </div>
      <div className="product-grid" ref={gridRef}>
        {filteredProducts.map(product => (
          <ProductCard
            id={product.id}
            key={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
      <Footer />
    </>
  )
}
export default HomePage;