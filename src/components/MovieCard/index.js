import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, voteAverage, posterPath, releaseDate} = movieDetails
  const a = new Date(releaseDate)
  const formattedDate = `${a.getDate()}-${a.getMonth() + 1}-${a.getFullYear()}`
  return (
    <li className="movie-card-container d-flex flex-column col-12 col-sm-6 col-lg-2 p-2">
      <div className="card h-100 shadow-sm">
        <img
          src={posterPath}
          alt={title}
          className="card-img-top movie-poster"
        />
        <div className="card-body d-flex flex-column align-items-center text-center">
          <h5 className="card-title movie-title">{title}</h5>
          <p>{formattedDate}</p>
          <p className="card-text movie-rating">⭐ {voteAverage}</p>
          <Link to={`/movie/${id}`}>
            <button className="btn btn-outline-success mt-auto" type="button">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default MovieCard
