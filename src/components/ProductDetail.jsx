import { Link, useParams, Outlet, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const isAdmin = user?.role === 'admin'
    const [searchedproduct, setsearchedproduct] = useState(null)
    const [error, setError] = useState(null)
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ name: '', category: '', price: '', image: '' })

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
    async function handleDelete() {
        if (!window.confirm('Delete this product ?')) return
        try {
            await api.delete(`/products/${id}`)
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed')
            return
        }
        navigate('/')
    }
    function startEdit() {
        setForm({
            name: searchedproduct.name,
            category: searchedproduct.category,
            price: searchedproduct.price,
            image: searchedproduct.image
        })
        setEditing(true)
    }
    async function handleSave(e) {
        e.preventDefault()
        let response
        try {
            response = await api.put(`/products/${id}`, { ...form, price: Number(form.price) })
        } catch (err) {
            alert(err.response?.data?.message || 'Update failed')
            return
        }
        setsearchedproduct(response.data)
        setEditing(false)
    }

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
            {editing ? (
                <form onSubmit={handleSave}>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                    >
                        <option value="Watches">Watches</option>
                        <option value="Bags">Bags</option>
                        <option value="Perfumes">Perfumes</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Sunglasses">Sunglasses</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        required
                    />
                    <div className="admin-actions">
                        <button type="submit" className="edit-btn">Save</button>
                        <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <h2>{searchedproduct.name}</h2>
                    <p>Category: {searchedproduct.category}</p>
                    <p>Price: ${searchedproduct.price.toLocaleString()}</p>
                    {isAdmin && (
                        <div className="admin-actions">
                            <button className="edit-btn" onClick={startEdit}>Edit</button>
                            <button className="delete-btn" onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </>
            )}
            <InquiryForm productName={searchedproduct.name} />
            <Link to='reviews' className="reviews-link">Reviews</Link>
            <Outlet />
        </DetailCard>
    )
}
export default ProductDetail