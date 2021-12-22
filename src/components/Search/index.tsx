import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { TextField, Button, CircularProgress } from '@mui/material'

import Form from './Form'

interface SearchProps {
  onSubmit: (login: string, complete: () => void) => void
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState('')
  const [invalid, setInvalid] = useState(false)

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLogin(e.target.value)
    setInvalid(!e.target.value.trim())
  }

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setInvalid(!login.trim())
    if (login) {
      setLoading(true)
      if (!loading) {
        onSubmit(login, () => setLoading(false))
      }
    }
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <TextField
        id="user-login"
        name="login"
        label="User login"
        variant="outlined"
        onChange={handleLoginChange}
        value={login}
        error={invalid}
        helperText={invalid && 'Please enter a value'}
      />
      <Button variant="contained" type="submit" sx={{ width: '106px' }}>
        {!loading ? 'Search' : <CircularProgress size="1.5rem" sx={{ color: '#FFF' }} />}
      </Button>
    </Form>
  )
}

export default Search
