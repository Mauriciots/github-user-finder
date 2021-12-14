import React, { useState, useEffect } from 'react'

import User from '../../service/User'
import { getUsers } from '../../service/searchUserService'
import Table from './Table'

interface Props {
  query: string
}

interface ResultState {
  data?: User[]
  totalCount: number
  page: number
}

const Result: React.FC<Props> = ({ query }) => {
  const [state, setState] = useState<ResultState>({
    totalCount: 0,
    page: 0,
  })

  const loadPage = (page = 0): void => {
    getUsers(query, page + 1)
      .then(result => {
        setState({
          data: result.items,
          totalCount: result.total_count,
          page,
        })
      })
  }

  useEffect(() => {
    if (query) {
      loadPage(0)
    }
  }, [query])

  return (
    <>
      {state.data && <Table {...state} data={state.data} rowsPerPage={9} onPageChange={loadPage} />}
    </>
  )
}

export default Result
