import {createContext} from 'react'

const MovieDatabaseContext = createContext({
  searchInput: '',
  searchTrigger: 0,
  onChangeSearchInput: () => {},
  onSearchSumbit: () => {},
})

export default MovieDatabaseContext
