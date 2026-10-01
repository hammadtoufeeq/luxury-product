import { Link, useParams, Outlet, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import DetailCard from './DetailCard'
import InquiryForm from './InquiryForm'
import { useState,  useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { useQuery , useMutation , useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
function ProductDetail() {
    const queryClient = useQueryClient()
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const isAdmin = user?.role === 'admin'
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ name: '', category: '', price: '', image: '' })

    const {data:searchedproduct , isPending , isError} = useQuery({
        queryKey:['product',id],
        queryFn: async function(){
            const response = await api.get(`/products/${id}`)
            return response.data
        }
    })    

    const deleteMutation = useMutation({
        mutationFn : async function(){
            await api.delete(`/products/${id}`)
        },
        onSuccess : function(){
            queryClient.invalidateQueries({queryKey:['products']})
            toast.success("Product deleted successfully")
            navigate('/')
        },
        onError: function(err){
            toast.error(err.response?.data?.message || 'Delete failed')
        }
    })
    function handleDelete(){
        if(!window.confirm('Delete this product ?')) return
        deleteMutation.mutate()
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
    const saveMutation = useMutation({
    mutationFn: async function (form) {
        const response = await api.put(`/products/${id}`, { ...form, price: Number(form.price) })
        return response.data
    },
    onMutate: async function (form) {
        await queryClient.cancelQueries({ queryKey: ['product', id] })

        const previousProduct = queryClient.getQueryData(['product', id])

        queryClient.setQueryData(['product', id], {
            ...previousProduct,
            ...form,
            price: Number(form.price)
        })

        setEditing(false)

        return { previousProduct }
    },
    onSuccess: function (data) {
        queryClient.setQueryData(['product', id], data)
        toast.success('Product saved successfully')
    },
    onError: function (err, form, context) {
        queryClient.setQueryData(['product', id], context.previousProduct)
        toast.error(err.response?.data?.message || "Update failed")
    },
    onSettled: function () {
        queryClient.invalidateQueries({ queryKey: ['product', id] })
    }
})
    async function handleSave(e) {
        e.preventDefault()
        saveMutation.mutate(form)
    }

    if (isError) {
        return (
            <DetailCard>
                <Link to="/" className="back-btn">Back</Link>
                <p>Product not found or failed to load</p>
            </DetailCard>
        )
    }
    if (isPending) {
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