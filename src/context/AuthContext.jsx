import { useState , createContext, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext()

export function AuthProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    
    useEffect(() => {
      axios.get('http://localhost:3002/users/me', { withCredentials: true }).then(()=>setIsLoggedIn(true)).catch(()=>setIsLoggedIn(false))
    }, [])
    async function logout() {
    try{
        await axios.post('http://localhost:3002/users/logout', {}, { withCredentials: true });
    }catch(err){
        console.error('Logout failed:', err);
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
