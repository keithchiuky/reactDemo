/*
    Login.jsx - React functional component for Login
    Author: Chiu King Yam
    
*/
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

//Construct component by using setToken prop from useToken
const Login = ({setToken})=>{

    let navigate = useNavigate()

    //Create state of Login component
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //Save username into state by using input field onChange event
    function updateUsername(event){
        event.preventDefault();
        setUsername(event.target.value)
        console.log(`username: ${username}`);
    }
    
    //Save password into state by using input field onChange event
    function updatePassword(event){
        event.preventDefault();
        setPassword(event.target.value)
        console.log(`password: ${password}`)
    }

    //Handle submission of user credential to login
    async function handleSubmit(event){
        event.preventDefault()
        //Authenticate pass to backend
        const tokenRes = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(data => data.json())

        //If token set in session, return to last page by navigate
        if(tokenRes.token){
            setToken(tokenRes.token,tokenRes._id)
            window.alert(tokenRes.message)
            navigate(-1)
        } else
            window.alert(tokenRes.message)
                
    }

    //Rendering login page
    return(

            <div className="container">
                <header className="p-3 bg-dark text-white">
                    <h1 className="fw-bold">Login</h1>
                </header>
                
                <form onSubmit={handleSubmit}>
                    <div className="d-grid gap-3">
                        <div className="row my-5">
                            <h3 className="d-flex justify-content-center mb-10">Username <br/></h3>
                            <div className="d-flex justify-content-center"><input type="text" onChange= {updateUsername} className="col-5"></input><br/></div>
                        </div>

                        <div className="row my-4">
                            <h3 className="d-flex justify-content-center">Password <br/></h3>
                            <div className="d-flex justify-content-center"><input type="password" onChange={updatePassword} className="col-5"></input><br/></div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary fs-4" type='submit'>Login</button>
                        </div>
                    
                    </div>
                </form>
            </div>    


    );

}

//Use the setToken prop from useToken component
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;