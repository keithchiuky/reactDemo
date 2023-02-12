import React,{useEffect, useState} from 'react'
import MovieCard from './MovieCard'

const SearchResult = (props)=>{

    //Create state for movies of search result
    const [movies, setMovies] = useState([])


    //function rendering each movie card
    const renderCard =  (movies) =>{
        return movies.map((movie, index)=>{
            return <MovieCard movie={movie} key={movie._id}/>
            
        })
    }

    //Pass search keyword to backend
    useEffect(()=>{

        async function getSearch(){

            if(movies.length === 0){
                const response =  await fetch(`http://localhost:3000/search_result/${props.searchWord}`)
    
                if(!response.ok){
                    const message = `Error occurred: ${response.statusText}`
                    console.log(message)
                    window.alert("No matched or similar result")
                }
    
                const movies = await response.json()
                setMovies(movies)
                }
            }
            
                
            
            
                
            getSearch()
            console.log(movies)

    }, [movies,props.searchWord])

    return (
        <div className="container">
            <h1>Search Result: </h1>
            <div className="container">
                {renderCard(movies)}
            </div>
        </div>
    )
    
}

export default SearchResult