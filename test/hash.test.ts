import * as hashUtil from '../src/hash'

test('hash parse', () => {

  let result = hashUtil.parse('/path/a/b?a=1&b=2#name')

  expect(typeof result).toBe('object')
  if (result) {
    expect(result.pathname).toBe('/path/a/b')
    expect(result.search).toBe('?a=1&b=2')
  }

  result = hashUtil.parse('')

  expect(typeof result).toBe('object')
  if (result) {
    expect(result.pathname).toBe('/')
    expect(result.search).toBe('')
  }

})

test('hash stringify', () => {

  let result = hashUtil.stringify({
    pathname: '/a/b/c',
    search: '?a=1&b=2'
  })

  expect(result).toBe('/a/b/c?a=1&b=2')

})
