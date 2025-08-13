import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/configValidation', () => ({
  parseAndValidateConfig: vi.fn(),
}))

import HomePage from './page'
import { parseAndValidateConfig } from '@/lib/configValidation'
import type { FormConfig } from '@/types/form'

describe('HomePage (page.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('switches to Result and shows error panel when config invalid', () => {
    ;(parseAndValidateConfig as unknown as import('vitest').Mock).mockReturnValue({
      parsedConfig: null,
      parseError: 'Invalid JSON configuration',
      errors: [],
    })

    render(<HomePage />)

    // Initially on Config tab
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()

    // Apply navigates to Result and shows error panel
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
    expect(screen.getByText('Invalid configuration')).toBeInTheDocument()
    expect(screen.getByText('Invalid JSON configuration')).toBeInTheDocument()
  })

  it('switches to Result and renders FormDisplay when config is valid', () => {
    const config: FormConfig = {
      title: 'My Form',
      fields: [
        { name: 'username', label: 'Username', type: 'string' },
      ],
      buttons: [ { text: 'Save', variant: 'primary' } ],
    }

    ;(parseAndValidateConfig as unknown as import('vitest').Mock).mockReturnValue({
      parsedConfig: config,
      parseError: null,
      errors: [],
    })

    render(<HomePage />)

    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    // Expect the form title to be rendered by FormDisplay
    expect(screen.getByRole('heading', { name: 'My Form' })).toBeInTheDocument()
  })
})
