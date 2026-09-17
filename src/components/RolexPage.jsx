import { Link, useParams } from 'react-router-dom'
import products from '../data/products.json'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'

function RolexPage() {
    const { id } = useParams()
    const rolex = products.find(product => product.id === Number(id))

    return (
        <DetailCard>
            <Link to="/" className="back-btn">Back</Link>
            <img src={rolex.image} alt={rolex.name} />
            <h2>{rolex.name}</h2>
            <p>Category: {rolex.category}</p>
            <p>Price: ${rolex.price.toLocaleString()}</p>
            <InquiryForm productName={rolex.name} />
        </DetailCard>
    )
}
export default RolexPage