import Login from './components/Login';
import SearchBar from './components/SearchBar'
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import SearchResult from './components/SearchResult'
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'

import useToken from './components/useToken'

//For parsing URL params to pass props to component SearchResult
function SearchChild(){
  let {search_word} = useParams()
  console.log(`From SearchChild: ${search_word}`)
  return(<SearchResult searchWord={search_word}/>)
}

//For parsing URL params to pass props to component MovieDetail
function MovieDetailChild(){
  let {movie_id} = useParams()
  console.log(`From MovieDetailChild: ${movie_id}`)
  return(<MovieDetail movie_id={movie_id}/>)
}

function App() {

  const {setToken} = useToken()

  return (
    <BrowserRouter>

      <SearchBar/>

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path = '/movie/:movie_id' element={<MovieDetailChild />}/>
        <Route path = '/login' element={<Login setToken={setToken}/>}/>
        <Route path = '/search_result/:search_word' element={<SearchChild/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
