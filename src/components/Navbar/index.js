import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'

import MovieDatabaseContext from '../../context/MovieDatabaseContext'
import './index.css'

const Navbar = props => {
  const {searchInput, onChangeSearchInput, onSearchSumbit} = useContext(
    MovieDatabaseContext,
  )
  return (
    <nav className="d-flex justify-content-between align-items-center p-3 bg-dark">
      <h1 className="text-white fw-bold m-0">movieDB</h1>

      <ul className="links-list d-flex justify-content-between list-unstyled m-0">
        <li className="mx-2">
          <Link to="/" className="text-white text-decoration-none">
            Popular
          </Link>
        </li>
        <li className="mx-2">
          <Link to="/top-rated" className="text-white text-decoration-none">
            Top Rated
          </Link>
        </li>
        <li className="mx-2">
          <Link to="/upcoming" className="text-white text-decoration-none">
            Upcoming
          </Link>
        </li>
      </ul>

      <form
        className="d-flex"
        onSubmit={e => {
          const {history} = props
          e.preventDefault()
          onSearchSumbit()
          history.push('/search')
        }}
      >
        <input
          value={searchInput}
          onChange={e => onChangeSearchInput(e.target.value)}
          type="text"
          className="form-control me-2"
          placeholder="Search..."
        />
        <button type="submit" className="btn btn-outline-success">
          Search
        </button>
      </form>
    </nav>
  )
}

export default withRouter(Navbar)
