import React from 'react'

import { render, screen } from '@testing-library/react'

import Footer from '.'

describe('Footer', () => {
  it('should render expected links', () => {
    render(<Footer />)

    expect(screen.getByText(/Made by/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mauriciots/ })).toBeInTheDocument()
    expect(screen.getByText(/Favicon by/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Freepik/ })).toBeInTheDocument()
    expect(screen.getByText(/from/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /www.flaticon.com/ })).toBeInTheDocument()
  })
})