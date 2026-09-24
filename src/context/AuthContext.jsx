import { useState , createContext, useEffect } from "react";
import api from '../api/axios.js'
export const AuthContext = createContext()

export function AuthProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    
    useEffect(() => {
      api.get('/users/me').then(()=>setIsLoggedIn(true)).catch(()=>setIsLoggedIn(false))
    }, [])
    async function logout() {
    try{
        await api.post('/users/logout', {});
    }catch(err){
        return console.error('Logout failed:', err);
    }
    alert('You have been logged out.');
    setIsLoggedIn(false);
}
    
    return(
        <AuthContext.Provider value={{isLoggedIn ,setIsLoggedIn , logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}
