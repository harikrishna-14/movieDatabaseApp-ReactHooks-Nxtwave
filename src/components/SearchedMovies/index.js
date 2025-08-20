import {useState, useContext, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import MovieDatabaseContext from '../../context/MovieDatabaseContext'

const SearchedMovies = () => {
  const [isLoading, setLoading] = useState(true)
  const [searchResponse, setSearchResponse] = useState({
    results: [],
    totalPages: 0,
    totalResults: 0,
  })

  const {searchInput, searchTrigger} = useContext(MovieDatabaseContext)

  const getSearchedMovies = async (page = 1) => {
    try {
      const apiKey = '37f1e4055893268ffc0bf5a4d1c3dca1'
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${page}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json()
      const updatedata = {
        totalPages: data.total_pages,
        totalResults: data.total_results,
        results: data.results.map(eachMovie => ({
          id: eachMovie.id,
          posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
          voteAverage: eachMovie.vote_average,
          title: eachMovie.title,
          releaseDate: eachMovie.release_date,
        })),
      }
      setSearchResponse(updatedata)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    getSearchedMovies()
  }, [searchTrigger])

  const renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" height={50} width={50} />
    </div>
  )

  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Don not get worried, Try to search again.</p>
    </div>
  )

  const renderSearchedMovies = () => {
    const {results} = searchResponse
    if (results.length === 0) {
      return renderEmptyView()
    }
    return (
      <ul className="d-flex flex-wrap">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  return (
    <div>
      <Navbar />
      <div>{isLoading ? renderLoading() : renderSearchedMovies()}</div>
      <Pagination
        totalPages={searchResponse.totalPages}
        apiCallBack={getSearchedMovies}
      />
    </div>
  )
}

export default SearchedMovies
