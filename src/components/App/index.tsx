import React from 'react'

import { Container, CircularProgress } from '@mui/material'

import useUserSearch from './useUserSearch'
import { getUsers } from '../../service/searchUser'
import Header from '../Header'
import Search from '../Search'
import Result from '../Result'
import Footer from '../Footer'

const ROWS_PER_PAGE = 9

const App: React.FC = () => {
  const {
    changePage,
    startSearch,
    completeSearch,
    failSearch,
    state,
  } = useUserSearch()

  const loadPage = async (query: string, page = 0): Promise<void> => {
    try {
      const result = await getUsers(query, ROWS_PER_PAGE, page + 1)
      completeSearch({
        data: result.items,
        totalCount: result.total_count,
        page,
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(e: any) {
      failSearch(e.response?.status || 'noresponse')
    }
  }

  const handleSearchSubmit = (searchLogin: string) => {
    startSearch(searchLogin)
    loadPage(searchLogin)
  }

  const handlePageChange = (page: number) => {
    changePage()
    loadPage(state.login, page)
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <Search onSubmit={handleSearchSubmit} />
        {state.loading ? (
          <CircularProgress /> 
        ) : (
          <Result 
            query={state.login}
            result={state}
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
