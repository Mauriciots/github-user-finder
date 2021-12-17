import React, { useState } from 'react'

import { Container, CircularProgress } from '@mui/material'

import { getUsers } from '../../service/searchUser'
import Header from '../Header'
import Search from '../Search'
import Result, { SearchResult } from '../Result'
import Footer from '../Footer'

const ROWS_PER_PAGE = 9

const App: React.FC = () => {
  const [login, setLogin] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult>({
    data: [],
    page: 0,
    totalCount: 0,
  })

  const loadPage = async (query: string, page = 0): Promise<void> => {
    setLoading(true)
    try {
      const result = await getUsers(query, ROWS_PER_PAGE, page + 1)
      setSearchResult({
        error: undefined,
        data: result.items,
        totalCount: result.total_count,
        page,
      })
      setLoading(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(e: any) {
      setSearchResult({
        error: e.response?.status || 'noresponse',
        data: [],
        totalCount: 0,
        page: 0,
      })
      setLoading(false)
    }
  }

  const handleSearchSubmit = (searchLogin: string) => {
    setLogin(searchLogin)
    loadPage(searchLogin)
  }

  const handlePageChange = (page: number) => {
    loadPage(login, page)
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <Search onSubmit={handleSearchSubmit} />
        {loading ? (
          <CircularProgress /> 
        ) : (
          <Result 
            query={login}
            result={searchResult}
            rowsPerPage={ROWS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      <Footer />
    </>
  )
}

export default App
