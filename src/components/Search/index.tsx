import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { TextField, Button } from '@mui/material'

import Form from './Form'

interface SearchProps {
  onSubmit: (login: string) => void
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
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
      onSubmit(login)
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
      <Button variant="contained" type="submit">
        Search
      </Button>
    </Form>
  )
}

export default Search
