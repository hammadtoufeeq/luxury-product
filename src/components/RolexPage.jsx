import { Link, useParams } from 'react-router-dom'
import products from '../data/products.json'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'

function RolexPage() {
    const { id } = useParams()
    const searchedproduct = products.find(product => product.id === Number(id))

    return (
        <DetailCard>
            <Link to="/" className="back-btn">Back</Link>
            <img src={searchedproduct.image} alt={searchedproduct.name} />
            <h2>{searchedproduct.name}</h2>
            <p>Category: {searchedproduct.category}</p>
            <p>Price: ${searchedproduct.price.toLocaleString()}</p>
            <InquiryForm productName={searchedproduct.name} />
        </DetailCard>
    )
}
export default RolexPage