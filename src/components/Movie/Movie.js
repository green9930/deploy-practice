import './Movie.scss'

const Movie = ({ children, ...restProps }) => {
  return (
    <main className="movieMain">
      <h1 className="movieHeading">List of Movies</h1>
      <div className="movieBody" {...restProps}>
        {children}
      </div>
    </main>
  )
}

Movie.List = function MovieList ({ movies, ...restProps }) {
  return (
    <ul className="movieList" {...restProps}>
      {
        movies.map(movie => {
          if (typeof movie === 'string') {
            return <p style={{
              fontWeight: '700',
              fontSize: '40px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>{movie}</p>
          }
          return(
            <li className="movieListItem" key={movie.id}>
              <figure>
                <img src={movie.medium_cover_image} alt={movie.title}/>
                <figcaption>{movie.title_long}</figcaption>
              </figure>
            </li>
          )
        })
      }
    </ul>
  )
}

Movie.SearchBox = function MovieSearchBox ({ labelContent, buttonContent, onSearch, ...restProps }) {
  return (
    <form className="searchForm">
      <label htmlFor="search">{labelContent}</label>
      <input className="searchBox" type="text" id="search"/>
      <button className="searchButton" onClick={onSearch}>{buttonContent}</button>
    </form>
  )
}

export default Movie