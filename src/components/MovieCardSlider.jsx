import React, {useEffect, useState} from 'react'
import MovieCard from './MovieCard'

//Create variables for storing cardList on each slide
var cardList1=[]
var cardList2=[]
var cardList3=[]
var cardList4=[]

const MovieCardSlider = () =>{
    //Create localstate for movies
    const [movies, setMovies] = useState([])

    //Rendering each card from the movies
    const renderCard =  (movies) =>{
        return movies.map((movie, index)=>{
            return <MovieCard movie={movie} key={index}/>
            
        })
    }

    //get movies from database when component is mounted
    useEffect(()=>{
            async function getMovies(){
                const response =  await fetch(`http://localhost:3000/movie`)

                if(!response.ok){
                    const message = `Error occurred: ${response.statusText}`
                    window.alert(message)
                }

                const movies = await response.json()
                setMovies(movies)
                console.log(movies.length)
                cardList1 = [movies[0],movies[1],movies[2]]
                cardList2 = [movies[3],movies[4],movies[5]]
                cardList3 = [movies[6],movies[7],movies[8]]
                cardList4 = [movies[9],movies[10]]
        }

        getMovies()

    }, [movies.length])

    //Rendering movielist card slider by using bootstrap carousel
        return(
            <div className="container-fluid">

                <div className="container bg-dark text-light"><h1>In Threater</h1></div>
                <div id="carouselControls" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="false">
                    <div className="row">
                        <div className="carousel-inner">
                               <div className="row">
                                   <div className="carousel-item active">

                                       <div className="container">
                                          <div className="row justify-content-center">
                                           
                                               {renderCard(cardList1)}
                                            
                                            </div> 
                                       </div>
                                       
                                      
                                   </div>

                                   <div className="carousel-item">
                                       <div className="container">
                                          <div className="row justify-content-center">
                                            {renderCard(cardList2)}
                                          </div> 
                                       </div>
                                       
                                   </div>

                                   <div className="carousel-item">
                                       <div className="container">
                                           <div className="row justify-content-center">
                                            {renderCard(cardList3)}
                                            </div>
                                       </div>
                                       
                                   </div>
                                   
                                   <div className="carousel-item">
                                       <div className="container">
                                         <div className="row justify-content-center">
                                           {renderCard(cardList4)}
                                        </div>  
                                       </div>

                                       
                                       
                                   </div>
                                   
                               </div>
                        </div>
                    </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                        </button>
    
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                        </button>
                </div>
            </div>
        );
    
}

export default MovieCardSlider