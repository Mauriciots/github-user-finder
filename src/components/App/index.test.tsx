import React from 'react'

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { getUsers } from '../../service/searchUser'
import App from '.'
import { mockUser } from '../../mock/user'

jest.mock('../../service/searchUser', () => ({
  getUsers: jest.fn(),
}))

const getUsersMock = getUsers as jest.Mock

const getUsersReturn = {
  items: Array.from({ length: 9 }, (_value, index) => mockUser(`user-${index}`, index)),
  total_count: 18,
}

describe('App', () => {
  it('should display results first page when searching user', async () => {
    getUsersMock.mockResolvedValue(getUsersReturn)

    render(<App />)
    userEvent.type(screen.getByLabelText(/User login/), 'user')
    userEvent.click(screen.getByRole('button', { name: /Search/ }))
    await waitForElementToBeRemoved(screen.getByRole('progressbar'))

    expect(screen.getAllByRole('row')).toHaveLength(10)
  })

  it('should display second page when clicking on next page button', async () => {
    getUsersMock.mockResolvedValue(getUsersReturn)

    render(<App />)
    userEvent.type(screen.getByLabelText(/User login/), 'user')
    userEvent.click(screen.getByRole('button', { name: /Search/ }))
    await waitForElementToBeRemoved(screen.getByRole('progressbar'))
    
    userEvent.click(screen.getByRole('button', { name: /Go to next page/i }))
    await waitForElementToBeRemoved(screen.getByRole('progressbar'))

    expect(screen.getByText(/10–18 of 18/i)).toBeInTheDocument()
  })

  it('should display error state when service call fails', async () => {
    getUsersMock.mockRejectedValue({ response: { status: 500 } })

    render(<App />)
    userEvent.type(screen.getByLabelText(/User login/), 'user')
    userEvent.click(screen.getByRole('button', { name: /Search/ }))
    await waitForElementToBeRemoved(screen.getByRole('progressbar'))

    expect(screen.getByText(/Search cannot be completed/)).toBeInTheDocument()
  })
})
