import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import BooleanField from './BooleanField'
import type { FieldConfig } from '@/types/form'

describe('BooleanField', () => {
  const field: FieldConfig = {
    name: 'enabled',
    label: 'Enabled',
    type: 'boolean',
  }

  it('renders a checkbox input with the correct name', () => {
    render(<BooleanField field={field} />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.getAttribute('name')).toBe('enabled')
    expect(checkbox.getAttribute('type')).toBe('checkbox')
  })
})
