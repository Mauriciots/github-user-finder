import React, { useState, useEffect } from 'react'

import User from '../../service/User'
import { getUsers } from '../../service/searchUserService'
import Table from './Table'
import FeedbackCard from './FeedbackCard'
import { CircularProgress } from '@mui/material'

interface Props {
  query: string
}

interface SearchResult {
  fail?: boolean
  data?: User[]
  totalCount: number
  page: number
}

const Result: React.FC<Props> = ({ query }) => {
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult>({
    totalCount: 0,
    page: 0,
  })

  const loadPage = async (page = 0): Promise<void> => {
    setLoading(true)
    try {
      const result = await getUsers(query, page + 1)
      setSearchResult({
        fail: false,
        data: result.items,
        totalCount: result.total_count,
        page,
      })
      setLoading(false)
    } catch(_error) {
      setSearchResult({
        fail: true,
        data: undefined,
        totalCount: 0,
        page: 0,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      loadPage(0)
    }
  }, [query])

  if (!query) {
    return <FeedbackCard type="empty" />
  }

  if (loading) {
    return <CircularProgress />
  }

  if (searchResult.fail) {
    return <FeedbackCard type="error" />
  }

  return (
    <>
      {searchResult.data?.length ? (
        <Table 
          {...searchResult}
          data={searchResult.data}
          rowsPerPage={9}
          onPageChange={loadPage}
        />
      ) : <FeedbackCard type="notFound" />}
    </>
  )
}

export default Result
