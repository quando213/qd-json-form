import { describe, it, expect } from 'vitest'
import { parseAndValidateConfig } from './configValidation'

describe('parseAndValidateConfig', () => {
  it('returns parseError for invalid JSON', () => {
    const res = parseAndValidateConfig('{ invalid json')
    expect(res.parsedConfig).toBeNull()
    expect(res.parseError).toBe('Invalid JSON configuration')
    expect(Array.isArray(res.errors)).toBe(true)
  })

  it('validates a correct config with no semantic errors', () => {
    const cfg = JSON.stringify({
      title: 'T',
      fields: [
        { name: 'a', label: 'A', type: 'string' },
        { name: 'b', label: 'B', type: 'enum', options: ['x', 'y'] },
      ],
      buttons: [ { text: 'Ok', variant: 'primary' } ]
    })
    const res = parseAndValidateConfig(cfg)
    expect(res.parseError).toBeNull()
    expect(res.parsedConfig).not.toBeNull()
    expect(res.errors).toEqual([])
  })

  it('reports non-array fields and buttons', () => {
    const cfg = JSON.stringify({ title: 'T', fields: {}, buttons: {} })
    const res = parseAndValidateConfig(cfg)
    expect(res.errors).toContain('fields must be an array')
    expect(res.errors).toContain('buttons must be an array')
  })

  it('reports invalid field entries and duplicate names', () => {
    const cfg = JSON.stringify({
      title: 'T',
      fields: [
        { name: 'x', label: 'X', type: 'string' },
        { name: 'x', label: 'X2', type: 'numeric' },
        { label: 'NoName', type: 'string' },
        { name: 'badType', label: 'Bad', type: 'oops' },
        { name: 'enum1', label: 'Enum', type: 'enum', options: [] },
      ],
      buttons: [ { text: 'Go' } ]
    })
    const res = parseAndValidateConfig(cfg)
    expect(res.errors.some(e => e.startsWith('duplicate field name'))).toBe(true)
    expect(res.errors).toContain('fields[2].name must be a non-empty string')
    expect(res.errors.some(e => e.includes('type is invalid'))).toBe(true)
    expect(res.errors).toContain('fields[4].options must be a non-empty array of strings for enum type')
  })

  it('validates button text and variant', () => {
    const cfg = JSON.stringify({
      title: 'T',
      fields: [ { name: 'a', label: 'A', type: 'string' } ],
      buttons: [ { text: '' }, { text: 'X', variant: 'weird' } ]
    })
    const res = parseAndValidateConfig(cfg)
    expect(res.errors).toContain('buttons[0].text must be a non-empty string')
    expect(res.errors.some(e => e.includes('variant is invalid'))).toBe(true)
  })
})
