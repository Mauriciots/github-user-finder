import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { Box, TextField, Button } from '@mui/material'

interface SearchProps {
  onSubmit: (login: string) => void
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [login, setLogin] = useState('')

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLogin(e.target.value)
  }

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    if (login) {
      onSubmit(login)
    }
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      paddingTop={2}
      onSubmit={handleFormSubmit}
    >
      <TextField
        id="user-login"
        name="login"
        label="User login"
        variant="outlined"
        onChange={handleLoginChange}
        value={login}
        required
      />
      <Button variant="contained" type="submit">Search</Button>
    </Box>
  )
}

export default Search
