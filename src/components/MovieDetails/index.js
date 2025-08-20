import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const MovieDetails = () => {
  const {id} = useParams()
  console.log(id)
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  const apiKey = '37f1e4055893268ffc0bf5a4d1c3dca1'

  const getMovieDetails = async () => {
    try {
      setIsLoading(true)

      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      )
      const movieData = await movieRes.json()

      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
      )
      const castData = await castRes.json()

      setMovie({
        title: movieData.title,
        posterPath: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
        voteAverage: movieData.vote_average,
        runtime: movieData.runtime,
        genres: movieData.genres.map(g => g.name).join(', '),
        releaseDate: movieData.release_date,
        overview: movieData.overview,
      })

      setCast(
        castData.cast.map(each => ({
          id: each.cast_id,
          name: each.original_name,
          character: each.character,
          profilePath: each.profile_path
            ? `https://image.tmdb.org/t/p/w300${each.profile_path}`
            : 'https://via.placeholder.com/150',
        })),
      )
    } catch (error) {
      console.error('Error fetching movie details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const renderMovieSection = () => (
    <div className="movie-details d-flex">
      <img src={movie.posterPath} alt={movie.title} className="movie-poster" />
      <div className="movie-info ms-4">
        <h2>{movie.title}</h2>
        <p>Rating:{movie.voteAverage}</p>
        <p>Duration: {movie.runtime} mins</p>
        <p>Genre: {movie.genres}</p>
        <p>Release Date: {movie.releaseDate}</p>
        <p>Overview: {movie.overview}</p>
      </div>
    </div>
  )

  const renderCastSection = () => (
    <div className="cast-section mt-4">
      <h3>Cast</h3>
      <div className="cast-grid">
        {cast.map(member => (
          <div key={member.id} className="cast-card">
            <img
              src={member.profilePath}
              alt={member.name}
              className="cast-image"
            />
            <p className="cast-name">{member.name}</p>
            <p className="cast-character">as {member.character}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="loader-container">
          <Loader type="TailSpin" color="#032541" height={50} width={50} />
        </div>
      ) : (
        <div className="movie-details-page container">
          {renderMovieSection()}
          {renderCastSection()}
        </div>
      )}
    </div>
  )
}

export default MovieDetails
