import React from 'react'

import { render, screen } from '@testing-library/react'

import { mockUser } from '../../mock/user'
import Result from '.'

const onPageChangeMock = jest.fn()

const baseProps = {
  query: 'anything',
  result: {
    data: [],
    totalCount: 0,
    page: 0,
  },
  rowsPerPage: 9,
  onPageChange: onPageChangeMock,
}

describe('Result', () => {
  it('should render empty state when query is not passed', () => {
    const props = {
      ...baseProps,
      query: '',
    }

    render(<Result {...props} />)

    expect(screen.getByText(/Results will be displayed here/)).toBeInTheDocument()
    expect(screen.getByText(/Type a login in the input above and then click on the SEARCH button to find GitHub users/)).toBeInTheDocument()
  })

  it('should render generic error state when result query.error is 500', () => {
    const props = {
      ...baseProps,
      result: {
        ...baseProps.result,
        error: 500,
      }
    }

    render(<Result {...props} />)

    expect(screen.getByText(/Search cannot be completed/)).toBeInTheDocument()
    expect(screen.getByText(/An unexpected failure is preventing the search completion. You can try again later/)).toBeInTheDocument()
  })

  it('should render api limit error state when result query.error is 403', () => {
    const props = {
      ...baseProps,
      result: {
        ...baseProps.result,
        error: 403,
      }
    }

    render(<Result {...props} />)

    expect(screen.getByText(/Search cannot be completed/)).toBeInTheDocument()
    expect(screen.getByText(/The server request quota limit has been reached. You can try again within about one minute/)).toBeInTheDocument()
  })

  it('should render not-found state when result.data is empty', () => {
    render(<Result {...baseProps} />)

    expect(screen.getByText(/Nothing has been found/)).toBeInTheDocument()
    expect(screen.getByText(/The search has been successfully completed but no matching user has been found/)).toBeInTheDocument()
  })

  it('should render table when result.data is not empty', () => {
    const props = {
      ...baseProps,
      result: {
        ...baseProps.result,
        data: [mockUser('mauriciots', 112271)],
        totalCount: 1,
      },
    }

    render(<Result {...props} />)

    expect(screen.getAllByRole('cell', { name: /mauriciots/ })).toHaveLength(2)
    expect(screen.getByRole('cell', { name: /User/ })).toBeInTheDocument()
  })
})