import { Routes, Route } from 'react-router-dom'
import './App.css'

import RolexPage from './components/RolexPage'
import HomePage from './components/Home'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/product/:id" element={<RolexPage/>} />
    </Routes>
  )
}



export default App