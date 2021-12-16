import React from 'react'

import { Typography, Link } from '@mui/material'

const Footer: React.FC = () => (
  <Typography 
    variant="body2"
    color="text.secondary"
    align="center"
    sx={{ mt: 5 }}
  >
    {'Made by '}
    <Link color="inherit" href="https://github.com/Mauriciots">
      Mauriciots 
    </Link>
    {` ${new Date().getFullYear()}. `}
    {'Favicon by '}
    <Link color="inherit" href="https://www.freepik.com">
      Freepik 
    </Link>
    {' from '}
    <Link color="inherit" href="https://www.flaticon.com">
      www.flaticon.com
    </Link>
  </Typography>
)

export default Footer
