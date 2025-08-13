import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import NumericField from './NumericField'
import type { FieldConfig } from '@/types/form'

describe('NumericField', () => {
  const field: FieldConfig = {
    name: 'age',
    label: 'Age',
    type: 'numeric',
  }

  it('renders a number input with id and name from field', () => {
    render(<NumericField field={field} />)
    const input = screen.getByRole('spinbutton') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.getAttribute('id')).toBe('age')
    expect(input.getAttribute('name')).toBe('age')
    expect(input.getAttribute('type')).toBe('number')
  })
})
