import { useState , createContext } from "react";

export const AuthContext = createContext()

export function AuthProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return(
        <AuthContext.Provider value={{isLoggedIn , setIsLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}