import React from 'react'

import { Box, Paper, Typography } from '@mui/material'
import {
  PersonSearchSharp as PersonSearchIcon,
  SearchOffSharp as SearchOffIcon,
  SentimentDissatisfiedSharp as SadIcon,
} from '@mui/icons-material'

interface Props {
  type: 'empty' | 'notFound' | 'genericError' | 'apiLimitError'
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
  'genericError': {
    icon: <SadIcon />,
    title: 'Search cannot be completed',
    body: 'An unexpected failure is preventing the search completion. You can try again later',
  },
  'apiLimitError': {
    icon: <SadIcon />,
    title: 'Search cannot be completed',
    body: 'The server request quota limit has been reached. You can try again within about one minute',
  },
}

const Empty: React.FC<Props> = ({ type }) => {
  const { icon, title, body } = feedbackElements[type]

  return (
    <Paper
      sx={{ 
        padding: 3,
        backgroundColor: 'secondary.main',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        rowGap: 2,
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
