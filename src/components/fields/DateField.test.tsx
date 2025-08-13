import { render } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import DateField from './DateField'
import type { FieldConfig } from '@/types/form'

describe('DateField', () => {
  const field: FieldConfig = {
    name: 'dob',
    label: 'Date of birth',
    type: 'date',
  }

  it('renders a date input with id and name from field', () => {
    render(<DateField field={field} />)
    const dateInput = document.getElementById('dob') as HTMLInputElement | null
    expect(dateInput).not.toBeNull()
    expect(dateInput!.getAttribute('id')).toBe('dob')
    expect(dateInput!.getAttribute('name')).toBe('dob')
    expect(dateInput!.getAttribute('type')).toBe('date')
  })
})
