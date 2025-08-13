import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import MultiLineField from './MultiLineField'
import type { FieldConfig } from '@/types/form'

describe('MultiLineField', () => {
  const field: FieldConfig = {
    name: 'bio',
    label: 'Bio',
    type: 'multi-line',
  }

  it('renders a textarea with id and name from field', () => {
    render(<MultiLineField field={field} />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()
    expect(textarea.getAttribute('id')).toBe('bio')
    expect(textarea.getAttribute('name')).toBe('bio')
  })
})
