import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect } from 'vitest'
import FormDisplay from './FormDisplay'
import type { FormConfig } from '@/types/form'

describe('FormDisplay', () => {
  const config: FormConfig = {
    title: 'User Form',
    fields: [
      { name: 'username', label: 'Username', type: 'string' },
      { name: 'age', label: 'Age', type: 'numeric' },
      { name: 'bio', label: 'Bio', type: 'multi-line' },
      { name: 'enabled', label: 'Enabled', type: 'boolean' },
      { name: 'dob', label: 'Date of birth', type: 'date' },
      { name: 'color', label: 'Favorite Color', type: 'enum', options: ['Red', 'Green'] },
    ],
    buttons: [
      { text: 'Cancel', variant: 'text' },
      { text: 'Save', variant: 'primary' },
    ],
  }

  it('renders title, labels, fields and buttons', () => {
    render(<FormDisplay config={config} />)

    expect(screen.getByRole('heading', { name: 'User Form' })).toBeInTheDocument()

    // Labels
    config.fields.forEach(f => {
      expect(screen.getByText(f.label)).toBeInTheDocument()
    })

    // Basic presence checks for a representative input of each type
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /age/i })).toBeInTheDocument()
    // textarea has role textbox, but different id/name
    const bioArea = screen.getByRole('textbox', { name: /bio/i })
    expect(bioArea).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /use setting/i })).toBeInTheDocument()
    // date input may show as textbox in jsdom; check presence by id
    const dateEl = document.getElementById('dob') as HTMLInputElement | null
    expect(dateEl).not.toBeNull()

    // Enum radios
    config.fields.find(f => f.name === 'color')!.options!.forEach(opt => {
      expect(screen.getByRole('radio', { name: opt })).toBeInTheDocument()
    })

    // Buttons
    const btnCancel = screen.getByRole('button', { name: 'Cancel' })
    const btnSave = screen.getByRole('button', { name: 'Save' })
    expect(btnCancel).toBeInTheDocument()
    expect(btnSave).toBeInTheDocument()
    expect(btnSave.getAttribute('type')).toBe('button')
  })
})
