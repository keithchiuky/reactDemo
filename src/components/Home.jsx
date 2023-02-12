import React, {useEffect, useState} from 'react'
import MovieCardSlider from './MovieCardSlider'
import MovieCard from './MovieCard'
const Home = ()=>{

    const [favList, setFavList] = useState([])
    const [user, setUser] = useState("")
    let movieList = []
    const [favFlag, setFavFlag] = useState(false)

    const renderCard =  (movies) =>{
        return movies.map((movie, index)=>{
            return (<div className="col-lg-4" key={index}>
                        <MovieCard movie={movie} key={index}/>
                    </div>)
            
        })
    }
    
    useEffect(()=>{
        //get user's favourite list if they have logged in the session
        async function getFavList(){
            if (sessionStorage.getItem('token') && favFlag === false){
                const sessionUser = sessionStorage.getItem('token')
                
                    if(user !== sessionUser){
                        setUser(sessionUser)
                    }
    
                    const response =  await fetch(`http://localhost:3000/myfavlist`,{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({user: user.replace(/['"]+/g,'')})
                    })
                    
                    
                        if(response){
                            setFavFlag(true)
                            const favourList = await response.json()
                            for (const doc of favourList){
                                for(const arrItem of doc){
                                    movieList.push(arrItem)
                                }
                            }
                            setFavList(movieList)
                        }
            }

            
        }

        getFavList()
    },[user,movieList, favList, favFlag])

    //Conidtional rendering
    //If session storage contain user's token, render with favourite list
    if(sessionStorage.getItem('token')){
        return (
            <div>
                <MovieCardSlider/>

                <div className="container bg-dark text-light">
                    <h2>Your Favourite Movie</h2>
                    <div className='row text-black'>
                        {renderCard(favList)}
                    </div>
                        
                </div>
            </div>
        )
    } else
    //Normal visitor list
    return(
        <div>
            <MovieCardSlider/>
        </div>
    );


}
export default Home