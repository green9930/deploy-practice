import {useState, useEffect} from 'react'
import Movie from '../components/Movie/Movie'
import { ReactComponent as Rainbow} from '../assets/rainbow.svg'

function App() {
  const [movies, setMovies] = useState([])
  const [movieName, setMovieName] = useState("")
  const [hasError, setHasError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const loadingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const onSearch = e => {
    e.preventDefault()
    setMovieName(e.target.previousElementSibling.value)
  }

  useEffect(() => {
    setIsLoading(true)

    fetch("https://yts.mx/api/v2/list_movies.json")
      .then(response => response.json())
      .then(({ data }) => {
        setMovies(data.movies)
        setIsLoading(false)
      })
      .catch(err => {
        setHasError(err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)

    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movieName}`)
      .then(response => response.json())
      .then(({data}) => {
        if (data.movie_count !== 0) setMovies(data.movies)
        else setMovies(['No movies found'])
        setIsLoading(false)
      })
      .catch(err => {
        setHasError(err)
        setIsLoading(false)
      })
  }, [movieName])

  if (isLoading) {
    return <Rainbow style={loadingStyle}/>
  }

  if (hasError) {
    return <div role="alert">{hasError.message}</div>
  }

  return (
    <div className="App">
      <Movie>
        <Movie.SearchBox onSearch={onSearch} labelContent="" buttonContent="검색"/>
        <Movie.List movies={movies} />
      </Movie>
    </div>
  )
}

export default App
