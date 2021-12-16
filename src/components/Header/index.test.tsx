import React from 'react'

import { render, screen } from '@testing-library/react'

import Header from '.'

describe('Header', () => {
  it('should render successfully', () => {
    render(<Header />)

    expect(screen.getByText(/User Finder/)).toBeInTheDocument()
  })
})