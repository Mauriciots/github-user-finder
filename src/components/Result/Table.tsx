import React from 'react'

import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Avatar
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { User } from '../../service/searchUser'

interface Props {
  data: User[],
  rowsPerPage: number,
  totalCount: number,
  page: number,
  onPageChange: (page: number) => void
}

const Table: React.FC<Props> = ({ data, rowsPerPage, totalCount, page, onPageChange }) => {
  const { palette } = useTheme()

  return (
    <Paper>
      <TableContainer
        sx={{ 
          maxHeight: {
            lg: '65vh',
          },
        }}
      >
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <Avatar alt={row.login} src={row.avatar_url} />
                </TableCell>
                <TableCell>{row.login}</TableCell>
                <TableCell>{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[rowsPerPage]}
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => onPageChange(newPage)}
        sx={{ backgroundColor: palette.secondary.main }}
        showFirstButton
        showLastButton
      />
    </Paper>
  )
}

export default Table