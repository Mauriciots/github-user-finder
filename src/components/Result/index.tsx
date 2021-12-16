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
  onPageChange: (page: number) => void
}

const Result: React.FC<Props> = ({ query, result, onPageChange }) => {
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
          rowsPerPage={9}
          onPageChange={onPageChange}
        />
      ) : <FeedbackCard type="notFound" />}
    </>
  )
}

export default Result
