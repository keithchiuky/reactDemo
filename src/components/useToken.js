import {useState} from 'react'

function useToken(){

    const getToken= ()=>{
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken?.token
    }

    //use getToken to set state
    const [token, setToken] = useState(getToken())
    
    
    //Save user token from session storage when browsing 
    const saveToken = (userToken)=>{
        sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    //Return the setToken method in JSON for other components to set user in session when other components mounted without importing again
    return{
        setToken: saveToken,
        token
    }
    

}

export default useToken