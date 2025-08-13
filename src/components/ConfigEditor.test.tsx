import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import ConfigEditor from './ConfigEditor'

describe('ConfigEditor', () => {
  it('renders textarea bound to value and calls onChange', () => {
    const handleChange = vi.fn()
    const txt = `{
  "a": 1
}`
    render(<ConfigEditor value={txt} onChange={handleChange} />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()
    expect(textarea.value).toContain('"a"')

    fireEvent.change(textarea, { target: { value: '{ }' } })
    expect(handleChange).toHaveBeenCalledWith('{ }')
  })

  it('calls onApply when Apply button is clicked', () => {
    const handleApply = vi.fn()
    render(<ConfigEditor value="{}" onChange={() => {}} onApply={handleApply} />)

    const btn = screen.getByRole('button', { name: 'Apply' })
    fireEvent.click(btn)
    expect(handleApply).toHaveBeenCalledTimes(1)
  })
})
