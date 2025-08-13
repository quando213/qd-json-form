import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import EnumField from './EnumField'
import type { FieldConfig } from '@/types/form'

describe('EnumField', () => {
  const field: FieldConfig = {
    name: 'color',
    label: 'Color',
    type: 'enum',
    options: ['Red', 'Green', 'Blue']
  }

  it('renders radio inputs for each option with proper ids and names', () => {
    render(<EnumField field={field} />)
    field.options!.forEach((opt) => {
      const radio = screen.getByRole('radio', { name: opt }) as HTMLInputElement
      expect(radio).toBeInTheDocument()
      expect(radio.getAttribute('name')).toBe('color')
      expect(radio.getAttribute('id')).toBe(`color-${opt}`)
      expect(screen.getByLabelText(opt)).toBe(radio)
    })
  })
})
