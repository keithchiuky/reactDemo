import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const SearchBar = ()=>{
    //Create state for storing search keyword
    const [searchWord, setSearch] = useState("")
    const navigate = useNavigate()

    //Handle search  bar when user submit to search
    function handleSubmit(){
        
            console.log(searchWord)
            navigate(`/search_result/${searchWord}`)
        
        
    }
    
    //Update search keyword onChange and store to state
    function updateSearchWord (event){
        setSearch(event.target.value)
        console.log(searchWord)
    }

    //Handle change of login and logout 
    function updateLoginButton (){
        if(sessionStorage.getItem('token')){
             return <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
        } else{
             return <a id="login" className="nav-link" href="/login" >Login</a>
        }

    }

    //Clear session when user log out
    function handleLogout(){
        sessionStorage.clear()
        window.alert("You have been logged out")
        updateLoginButton()
        window.location.reload()
    }

    //Rendring search bar
    return(
            
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">MovieDB</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {updateLoginButton()}
                            </li>
                        </ul>
                    
                
                        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={updateSearchWord}></input>
                                </div>
                                <div className="col"><button type="submit" className="btn btn-success my-2 my-sm-0">Search</button></div>
                                
                            </div>
                            
                        </form>
                    </div>              
                </nav>
        )

}

export default SearchBar