import React from 'react'

import { Box, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  PersonSearchSharp as PersonSearchIcon,
  SearchOffSharp as SearchOffIcon,
  SentimentDissatisfiedSharp as SadIcon,
} from '@mui/icons-material'

interface Props {
  type: 'empty' | 'notFound' | 'error'
}

const feedbackElements = {
  'empty': {
    icon: <PersonSearchIcon />,
    title: 'Results will be displayed here',
    body: 'Type a login in the input above and then click on the SEARCH button to find GitHub users',
  },
  'notFound': {
    icon: <SearchOffIcon />,
    title: 'Nothing has been found',
    body: 'The search has been successfully completed but no matching user has been found',
  },
  'error': {
    icon: <SadIcon />,
    title: 'Search cannot be completed',
    body: 'An expected failure is preventing the search completion. You can try again later',
  },
}

const Empty: React.FC<Props> = ({ type }) => {
  const { palette, spacing } = useTheme()
  const { icon, title, body } = feedbackElements[type]

  return (
    <Paper
      sx={{ 
        padding: spacing(3),
        backgroundColor: palette.secondary.main,
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        rowGap: spacing(2),
      }}
    >
      <Box sx={{ '& svg': { fontSize: '48px' } }}>
        {icon}
      </Box>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body1">{body}</Typography>
    </Paper>
  )
}

export default Empty
