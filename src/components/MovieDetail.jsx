import React, {useEffect, useState} from 'react'
import StarRatings from 'react-star-ratings'
import {useNavigate, useLocation} from 'react-router-dom'

const MovieDetail = (props)=>{
    const [rate, setRate] = useState(0)
    const [user, setUser] = useState()
    const [myRate, setMyRate] = useState(0)
    const [fav, setFav] = useState(0)
    const [movie, setMovie] = useState({
        name: "",
        genre:"",
        img: 'morbius.jpg',
        description:"",
        stars: "",
        director:"",
        release_year: 0,
        duration:0,
        video: ""
    })
    
    const navigate = useNavigate() 

    //Get movie detail when component is mounted or updated(clicking into movie card or update rating)
    useEffect(()=>{
        //get specific movie details from backend
        async function getMovie(){
            const response = await fetch(`http://localhost:3000/movie/${props.movie_id}`)

            if(!response.ok){
                const message = `Error occurred: ${response.statusText}`
                window.alert(message)
            }

            const movies = await response.json()
            setMovie(movies)
            
        }

        //get overall rating of the movie from rating
        async function getOverallRating(){
            const response = await fetch(`http://localhost:3000/avg_rating/${props.movie_id}`)
            if(!response.ok){
                const message = `Error occurred: ${response.statusText}`
                window.alert(message)
            }

            const rate = await response.json()

            if(rate.length !== 0)
                setRate(rate[0].avgRating)
        }

        
        //get user's rating on the movie
        async function getMyRating(){
            if(sessionStorage.getItem('token')){
               setUser(sessionStorage.getItem('token').replace(/['"]+/g,'')) 
                const response = await
                    fetch('http://localhost:3000/myrating',{
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({user: user , movie: `${props.movie_id}`})
                        }).then(data=> data.json())

                if(response)
                        setMyRate(response.rating)
            }else
                setMyRate(0)
            
        }

        //get user's favourite status of the movie
        async function getMyFav(){
            if(sessionStorage.getItem('token')){
                setUser(sessionStorage.getItem('token').replace(/['"]+/g,'')) 
                 const response = await
                     fetch('http://localhost:3000/myfav',{
                             method: 'POST',
                             headers:{
                                 'Content-Type': 'application/json'
                             },
                             body: JSON.stringify({user: user , movie: `${props.movie_id}`})
                         }).then(data=> data.json())
 
                        if(response)
                         setFav(response.isFav)
             }else
                 setFav(0)
        }
        
        getMyRating()
        getMyFav()
        getOverallRating()
        getMovie()
        
    },[user, props.movie_id]);

    //update user rating when new rating change
    async function updateMyRating(newRating){
        const response = await fetch('http://localhost:3000/updatemyrating',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user , movie: `${props.movie_id}`, rating: newRating})
        }).then(data=>data.json())

        window.alert(response.message)
    }

    //update user's favourite status when star change
    async function updateFav(newRating){
        const response = await fetch('http://localhost:3000/updatefav',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user , movie: `${props.movie_id}`, rating: newRating})
        }).then(data=>data.json())

        window.alert(response.message)
    }

    //Handle stars of user rating
    function changeRating( newRating){
        if(sessionStorage.getItem('token')){
           setMyRate(newRating)
           updateMyRating(newRating)
           navigate(0)
        }else{
            window.alert('You need to login before rating!')
            navigate("/login")
        }
        
    }

    //Handle star of user favourite
    function changeFav(newRating){
        if(sessionStorage.getItem('token')){
            if (newRating === fav){
               setFav(0) 
            } else{
                setFav(newRating)
            }
            updateFav(newRating)
            navigate(0)
        }
    }

    //rendering movie detail
    return (
        <div className="bg-secondary text-light">
            <div className ="container">
                
                    
                <div className="row justify-content-center">
                    <div className="col">
                        <h1 style={{"fontSize": 50+"px"} }>{movie.name}</h1>
                    </div>
                    <div className="col--lg-4">
                        <StarRatings rating={fav} starRatedColor="yellow" starHoverColor="yellow" numberOfStars={1} changeRating={changeFav}/>
                    </div>        
                </div>
                       
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <img src={movie.img}alt="#" width="400"/>  
                    </div>
                    <div className="col-lg-4 col-md-6">
                    <iframe width="800" height="600" src={movie.video} title="YouTube video player" frameBorder="0" ></iframe>
                    </div>
                </div>

                <div className="container">
                    <div className="row my-1">
                        <div className='col-lg-4'>
                            <h3>Overall Rating</h3>
                        </div>
                        <div className="col-lg-4">
                            <StarRatings rating={rate} starRatedColor="rgb(66, 132, 245)" starHoverColor="rgb(66, 132, 245)" numberOfStars={5} />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className='col-lg-4'>
                            <h3>Your Rating</h3>
                        </div>
                        <div className="col-lg-4">
                            <StarRatings rating={myRate} starRatedColor="rgb(66, 132, 245)" starHoverColor="rgb(66, 132, 245)" numberOfStars={5} changeRating={changeRating}/>
                        </div>
                    </div>

                    <div className="row my-1">
                        <h3>Stars: {movie.stars}</h3> 
                    </div>

                    <div className="row my-1">
                        <h3>Director: {movie.director}</h3> 
                    </div>

                    <div className="row my-1">
                        <h3>Year of Release: {movie.release_year}</h3> 
                    </div>

                    <div className="row my-1">
                        <h3>Genre: {movie.genre}</h3> 
                    </div>

                    <div className="row my-1">
                        <h3>Duration: {movie.duration} Minutes</h3> 
                    </div>              
                         
                    <div className="row my-2">
                        <h3>{movie.description}</h3>   
                    </div>

                        
                </div>
            
                
            </div>
        </div>
            
       
    );

}

export default MovieDetail