import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import StringField from './StringField'
import type { FieldConfig } from '@/types/form'

describe('StringField', () => {
  const field: FieldConfig = {
    name: 'username',
    label: 'Username',
    type: 'string',
  }

  it('renders a text input with id and name from field', () => {
    render(<StringField field={field} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(!!input).toBe(true)
    expect(input.getAttribute('id')).toBe('username')
    expect(input.getAttribute('name')).toBe('username')
    expect(input.getAttribute('type')).toBe('text')
  })
})
