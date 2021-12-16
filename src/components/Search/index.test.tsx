import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Search from '.'

const onSubmitMock = jest.fn()

describe('Search', () => {
  beforeEach(() => {
    render(<Search onSubmit={onSubmitMock} />)
  })

  it('should call onSubmit function when enter login and click on "Search"', () => {
    userEvent.type(screen.getByLabelText(/User login/), 'pete')
    userEvent.click(screen.getByRole('button', { name: /Search/ }))

    expect(onSubmitMock).toHaveBeenCalledTimes(1)
    expect(onSubmitMock).toHaveBeenCalledWith('pete')
  })

  it('should display validation message and prevent form submission when click on "Search" without entering a value', () => {
    userEvent.click(screen.getByRole('button', { name: /Search/ }))

    expect(screen.getByText(/Please enter a value/)).toBeInTheDocument()
    expect(onSubmitMock).not.toHaveBeenCalled()
  })

  it('should display validation message when clear search input', () => {
    const userLogin = screen.getByLabelText(/User login/)

    userEvent.type(userLogin, 'pete')
    userEvent.clear(userLogin)

    expect(screen.getByText(/Please enter a value/)).toBeInTheDocument()
  })
})