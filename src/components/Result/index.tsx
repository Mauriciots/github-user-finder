import React from 'react'

import { User } from '../../service/searchUser'
import Table from './Table'
import FeedbackCard from './FeedbackCard'

export interface SearchResult {
  error?: number | 'noresponse'
  data: User[]
  totalCount: number
  page: number
}

interface Props {
  query: string
  result: SearchResult
  rowsPerPage: number
  onPageChange: (page: number) => void
}

const Result: React.FC<Props> = ({ query, result, rowsPerPage, onPageChange }) => {
  if (!query) {
    return <FeedbackCard type="empty" />
  }

  if (result.error) {
    return <FeedbackCard type={result.error === 403 ? 'apiLimitError' : 'genericError'} />
  }

  return (
    <>
      {result.data?.length ? (
        <Table 
          {...result}
          data={result.data}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
        />
      ) : <FeedbackCard type="notFound" />}
    </>
  )
}

export default Result
