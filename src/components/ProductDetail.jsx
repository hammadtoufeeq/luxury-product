import { Link, useParams , Outlet } from 'react-router-dom'
import axios from 'axios'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'
import { useEffect , useState } from 'react'
function ProductDetail() {
    const { id } = useParams()
    const [searchedproduct, setsearchedproduct] = useState(null)
    useEffect(() => {
      axios.get(`http://localhost:3002/products/${id}`).then(response => {
        setsearchedproduct(response.data)
      })
    
    }, [id])
    if(!searchedproduct){
        return <p>Loading...</p>
    }

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