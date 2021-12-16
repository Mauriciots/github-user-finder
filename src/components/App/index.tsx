import React, { useState } from 'react'

import { Container, CircularProgress } from '@mui/material'

import { getUsers } from '../../service/searchUser'
import Header from '../Header'
import Search from '../Search'
import Result, { SearchResult } from '../Result'
import Footer from '../Footer'

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
          <Result query={login} result={searchResult} onPageChange={handlePageChange} />
        )}
      </Container>
      <Footer />
    </>
  )
}

export default App
