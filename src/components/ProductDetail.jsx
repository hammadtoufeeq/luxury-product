import { Link, useParams , Outlet } from 'react-router-dom'
import products from '../data/products.json'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'
import { useEffect } from 'react'
function ProductDetail() {
    const { id } = useParams()
    const searchedproduct = products.find(product => product.id === Number(id))
    useEffect(() => {
      document.title = searchedproduct.name
    
    }, [searchedproduct])
    

    return (
        <DetailCard>
            <Link to="/" className="back-btn">Back</Link>
            <img src={searchedproduct.image} alt={searchedproduct.name} />
            <h2>{searchedproduct.name}</h2>
            <p>Category: {searchedproduct.category}</p>
            <p>Price: ${searchedproduct.price.toLocaleString()}</p>
            <InquiryForm productName={searchedproduct.name} />
            <Link to='reviews' className="reviews-link">Reviews</Link>
            <Outlet/>
        </DetailCard>
    )
}
export default ProductDetail