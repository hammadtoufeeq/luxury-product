import { useState , createContext, useEffect } from "react";

export const AuthContext = createContext()

export function AuthProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("Login")==="true")
    // null === "true"
    useEffect(() => {
      localStorage.setItem("Login" , isLoggedIn)
    
      
    }, [isLoggedIn])
    
    return(
        <AuthContext.Provider value={{isLoggedIn , setIsLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}