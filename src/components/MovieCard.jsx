import React, {useEffect, useState} from 'react'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'

//Construct single MovieCard by passing single movie prop
const MovieCard = (props)=>{
    
    const [rate, setRate] = useState(0)

    useEffect(()=>{
        //Get the movie's overall average rating
        async function getRating(){
            const response = await fetch(`http://localhost:3000/avg_rating/${props.movie._id}`)
            if(!response.ok){
                const message = `Error occurred: ${response.statusText}`
                window.alert(message)
            }

            const rating = await response.json()
            if(rating.length !== 0){
                setRate(rating[0].avgRating)
            }
            
        }

        getRating()

    })

    //Construct and render card for movie using bootstrap
    return(   
        <div className='col-sm-12 col-lg-4'>
            <div className="card" style={{width:300+'px'}}>
                <div className="card border">
                    <Link to={`/movie/${props.movie._id}`} state={{movie_id: props.movie._id}}><img src={props.movie.img} className="card-img-top" alt="" height="500"/></Link>
                    <div className="card-body">
                        <StarRatings rating={rate} numberOfStars={5} starRatedColor="rgb(66, 132, 245)" starDimension="40px"/>
                        <h4 className="card-title">{props.movie.name}</h4>
                        <p className="card-text">{props.movie.description}</p>
                    </div>
                </div>
            </div>
        </div>

        );
}

export default MovieCard;