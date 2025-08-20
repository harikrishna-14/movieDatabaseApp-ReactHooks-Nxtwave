import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import './App.css'

import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SearchedMovies from './components/SearchedMovies'
import MovieDetails from './components/MovieDetails'
import MovieDatabaseContext from './context/MovieDatabaseContext'

// write your code here
const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchTrigger, setSearchTrigger] = useState(0)

  const onChangeSearchInput = value => {
    setSearchInput(value)
  }

  const onSearchSumbit = () => setSearchTrigger(prev => prev + 1)

  return (
    <MovieDatabaseContext.Provider
      value={{searchInput, onChangeSearchInput, searchTrigger, onSearchSumbit}}
    >
      <Switch>
        <Route exact path="/" component={PopularMovies} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/search" component={SearchedMovies} />
        <Route exact path="/movie/:id" component={MovieDetails} />
      </Switch>
    </MovieDatabaseContext.Provider>
  )
}

export default App
