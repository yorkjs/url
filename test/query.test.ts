import * as queryUtil from '../src/query'

test('query parse', () => {

  let result: any = queryUtil.parse('')

  expect(typeof result).toBe('object')

  result = queryUtil.parse(`a=1&b=0.1&c=true&d=false&e=str&f=null&g&h[]=1&h[]=2&i=${encodeURIComponent('?@#$%^&')}`)
  expect(typeof result).toBe('object')
  if (result) {
    expect(result.a).toBe(1)
    expect(result.b).toBe(0.1)
    expect(result.c).toBe(true)
    expect(result.d).toBe(false)
    expect(result.e).toBe('str')
    expect(result.f).toBe(null)
    expect(result.g).toBe(undefined)
    expect(Array.isArray(result.h)).toBe(true)
    expect(JSON.stringify(result.h)).toBe(JSON.stringify([1, 2]))
    expect(result.i).toBe('?@#$%^&')
  }
})

test('query stringify', () => {
  expect(queryUtil.stringify({})).toBe('')
  expect(queryUtil.stringify({a: undefined})).toBe('')
  expect(queryUtil.stringify({a: 1, b: 0.1})).toBe('a=1&b=0.1')
  expect(queryUtil.stringify({a: true, b: false})).toBe('a=true&b=false')
  expect(queryUtil.stringify({a: [1,2,3], b: 'str', c: '?/#'})).toBe(`a[]=1&a[]=2&a[]=3&b=str&c=${encodeURIComponent('?/#')}`)
  expect(queryUtil.stringify({a: 1, b: 1, c: undefined})).toBe('a=1&b=1')
})