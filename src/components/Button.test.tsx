import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders a button with default type="button" and secondary styles', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' }) as HTMLButtonElement
    expect(btn).toBeInTheDocument()
    expect(btn.type).toBe('button')
    // secondary has bg-white by definition
    expect(btn.className).toContain('bg-white')
  })

  it('applies primary variant styles', () => {
    render(<Button variant="primary">Do it</Button>)
    const btn = screen.getByRole('button', { name: 'Do it' }) as HTMLButtonElement
    // primary has bg-indigo-600 in its class list
    expect(btn.className).toContain('bg-indigo-600')
  })
})
