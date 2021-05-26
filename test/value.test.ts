import * as valueUtil from '../src/value'

test('value parse', () => {
  expect(valueUtil.parse('1')).toBe(1)
  expect(valueUtil.parse('0.1')).toBe(0.1)
  expect(valueUtil.parse('-1')).toBe(-1)
  expect(valueUtil.parse('-0.1')).toBe(-0.1)
  expect(valueUtil.parse('true')).toBe(true)
  expect(valueUtil.parse('false')).toBe(false)
  expect(valueUtil.parse('null')).toBe(null)
  expect(valueUtil.parse('abc')).toBe('abc')
  expect(valueUtil.parse(encodeURIComponent('?@#$%^&'))).toBe('?@#$%^&')
})

test('value stringify', () => {
  expect(valueUtil.stringify(1)).toBe('1')
  expect(valueUtil.stringify(0.1)).toBe('0.1')
  expect(valueUtil.stringify(-1)).toBe('-1')
  expect(valueUtil.stringify(-0.1)).toBe('-0.1')
  expect(valueUtil.stringify(true)).toBe('true')
  expect(valueUtil.stringify(false)).toBe('false')
  expect(valueUtil.stringify(null)).toBe('null')
  expect(valueUtil.stringify(undefined)).toBe(undefined)
  expect(valueUtil.stringify('abc')).toBe('abc')
  expect(valueUtil.stringify('?@#$%^&')).toBe(encodeURIComponent('?@#$%^&'))
})