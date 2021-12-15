import React, { FormEventHandler } from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface Props {
  onSubmit: FormEventHandler
  children: JSX.Element[]
}

const Form: React.FC<Props> = ({ onSubmit, children }) => {
  const { spacing } = useTheme()

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      paddingTop={2}
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        paddingY: spacing(3),
        columnGap: spacing(1),
      }}
    >
      {[...children]}
    </Box>
  )
}

export default Form
