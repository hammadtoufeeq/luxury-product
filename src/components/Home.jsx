import Navbar from './Navbar'
import SearchBox from './SearchBox'
import CategoryFilter from './CategoryFilter'
import ProductCard from './ProductCard'
import Footer from './Footer'
import useLocalStorage from '../hooks/useLocalStorage'
import api from '../api/axios.js'
import { useState, useRef, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
function HomePage() {
  const gridRef = useRef(null)
  const [searchTerm, setsearchTerm] = useLocalStorage("searchTerm", "")
  const [categoryupdate, setcategoryupdate] = useState("")


  const { data, isPending, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async function () {
      const response = await api.get('/products')
      return response.data
    }
  })
  const products = data || []

  const filteredProducts = useMemo(() =>
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryupdate === "" || categoryupdate === product.category)
    ), [products, searchTerm, categoryupdate])
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
      {isPending && (
        <div className="page-status">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      )}
      {isError && (
        <div className="page-status page-status-error">
          <p>Failed to load products. Please try again later.</p>
        </div>
      )}
      <div className="product-grid" ref={gridRef}>
        {filteredProducts.map(product => (
          <ProductCard
            id={product._id}
            key={product._id}
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