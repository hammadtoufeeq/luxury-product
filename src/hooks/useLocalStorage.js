import { useEffect , useState } from "react";

function useLocalStorage(key,intitalValue){

    const [value, setvalue] = useState(localStorage.getItem(key) || intitalValue)
    useEffect(() => {
      localStorage.setItem(key , value)
    }, [value])
    return [value,setvalue]
    

}
export default useLocalStorage;