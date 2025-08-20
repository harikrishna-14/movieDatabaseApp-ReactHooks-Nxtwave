import {useState} from 'react'

import './index.css'

const Pagination = props => {
  const {totalPages, apiCallBack} = props
  const [page, setPage] = useState(1)

  const onPrevPage = () => {
    if (page !== 1) {
      setPage(prev => prev - 1)
      apiCallBack(page - 1)
    }
  }

  const onNextPage = () => {
    if (page !== totalPages) {
      setPage(prev => prev + 1)
      apiCallBack(page + 1)
    }
  }

  return (
    <div className="pagination-container d-flex justify-content-center align-items-center gap-3">
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={onPrevPage}
      >
        Prev
      </button>
      <p className="mb-0 text-white fw-bold">{page}</p>
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
