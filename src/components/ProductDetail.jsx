import { Link, useParams, Outlet } from 'react-router-dom'
import api from '../api/axios.js'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'
import { useState, useEffect } from 'react'

function ProductDetail() {
    const { id } = useParams()
    const [searchedproduct, setsearchedproduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
        api.get(`/products/${id}`)
            .then(response => {
                setsearchedproduct(response.data)
            })
            .catch(err => {
                console.error('Product fetch failed:', err.response?.data || err.message)
                setError('Product not found or failed to load.')
            })
    }, [id])

    if (error) {
        return (
            <DetailCard>
                <Link to="/" className="back-btn">Back</Link>
                <p>{error}</p>
            </DetailCard>
        )
    }

    if (!searchedproduct) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        )
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
            <Outlet />
        </DetailCard>
    )
}
export default ProductDetail