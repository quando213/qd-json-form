import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import Tabs from './Tabs'
import type { TabItem } from '@/types/ui'

describe('Tabs', () => {
  const tabs: TabItem[] = [
    { name: 'Config', key: 'config' },
    { name: 'Result', key: 'result' },
    { name: 'Extra', key: 'extra' },
  ]

  it('renders all tabs and marks the active tab with aria-current', () => {
    render(<Tabs tabs={tabs} activeTab="result" onTabChange={() => {}} />)

    // All tab labels appear
    tabs.forEach(t => {
      expect(screen.getByRole('link', { name: t.name })).toBeInTheDocument()
    })

    // The active one has aria-current="page"
    const active = screen.getByRole('link', { name: 'Result' })
    expect(active).toHaveAttribute('aria-current', 'page')

    // Inactive ones should not have aria-current
    expect(screen.getByRole('link', { name: 'Config' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Extra' })).not.toHaveAttribute('aria-current')
  })

  it('calls onTabChange with the clicked tab key', () => {
    const onTabChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="config" onTabChange={onTabChange} />)

    const resultTab = screen.getByRole('link', { name: 'Result' })
    fireEvent.click(resultTab)
    expect(onTabChange).toHaveBeenCalledWith('result')
  })
})
