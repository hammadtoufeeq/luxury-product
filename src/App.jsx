import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProductDetail from './components/ProductDetail'
import HomePage from './components/Home'
import Review from './components/Review'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/product/:id" element={
        <ProtectedRoute>
        <ProductDetail/>
        </ProtectedRoute>} >
      <Route path='reviews' element={<Review/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>

    </Routes>
  )
}



export default App