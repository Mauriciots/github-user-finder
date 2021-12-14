import React, { useState } from 'react'

import { Container } from '@mui/material'

import Header from '../Header'
import Search from '../Search'
import Result from '../Result'

const App: React.FC = () => {
  const [login, setLogin] = useState('')

  const handleSearchSubmit = (searchLogin: string) => {
    setLogin(searchLogin)
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <Search onSubmit={handleSearchSubmit} />
        <Result query={login} />
      </Container>
    </>
  )
}

export default App
