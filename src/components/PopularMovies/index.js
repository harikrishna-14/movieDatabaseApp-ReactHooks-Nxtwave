import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const PopularMovies = () => {
  const [isLoading, setLoading] = useState(true)
  const [popularMoviesData, setPopularMoviesData] = useState({
    results: [],
    totalPages: 0,
    totalResults: 0,
  })

  const getPopularMovies = async (page = 1) => {
    try {
      const apiKey = '37f1e4055893268ffc0bf5a4d1c3dca1'
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
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
      setPopularMoviesData(updatedata)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  const renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" height={50} width={50} />
    </div>
  )

  const renderPopularMovies = () => {
    const {results} = popularMoviesData
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
      <div>{isLoading ? renderLoading() : renderPopularMovies()}</div>
      <Pagination
        totalPages={popularMoviesData.totalPages}
        apiCallBack={getPopularMovies}
      />
    </div>
  )
}

export default PopularMovies
