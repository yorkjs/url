import * as urlUtil from '../src/url'

test('url parse', () => {

  let result = urlUtil.parse('https://baidu.com:8080/path/a.js?a=1&b=2#name')

  expect(typeof result).toBe('object')
  if (result) {
    expect(result.protocol).toBe('https:')
    expect(result.hostname).toBe('baidu.com')
    expect(result.port).toBe('8080')
    expect(result.pathname).toBe('/path/a.js')
    expect(result.search).toBe('?a=1&b=2')
    expect(result.hash).toBe('#name')
  }

  result = urlUtil.parse('HTTP://baidu.com:8080/path-a/b_c?a=1&b=2#name')

  expect(typeof result).toBe('object')
  if (result) {
    expect(result.protocol).toBe('http:')
    expect(result.hostname).toBe('baidu.com')
    expect(result.port).toBe('8080')
    expect(result.pathname).toBe('/path-a/b_c')
    expect(result.search).toBe('?a=1&b=2')
    expect(result.hash).toBe('#name')
  }

  result = urlUtil.parse('//localhost:9090')
  expect(typeof result).toBe('object')
  if (result) {
    expect(result.protocol).toBe('')
    expect(result.hostname).toBe('localhost')
    expect(result.port).toBe('9090')
    expect(result.pathname).toBe('/')
    expect(result.search).toBe('')
    expect(result.hash).toBe('')
  }

  result = urlUtil.parse('/a/b/c?a=1&b=2')
  expect(result).toBe(undefined)
})


test('url stringify', () => {

  let result = urlUtil.stringify({
    protocol: '',
    hostname: 'localhost',
    port: '',
    pathname: '',
    search: '',
    hash: '',
  })

  expect(result).toBe('//localhost')

  result = urlUtil.stringify({
    protocol: '',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
  })

  expect(result).toBe('//localhost')

  result = urlUtil.stringify({
    protocol: 'http:',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '?a=1',
    hash: '',
  })

  expect(result).toBe('http://localhost?a=1')

  result = urlUtil.stringify({
    protocol: 'http:',
    hostname: 'localhost',
    port: '8080',
    pathname: '/',
    search: '?a=1',
    hash: '',
  })

  expect(result).toBe('http://localhost:8080?a=1')


  result = urlUtil.stringify({
    protocol: 'http:',
    hostname: 'localhost',
    port: '8080',
    pathname: '/',
    search: '?',
    hash: '#',
  })

  expect(result).toBe('http://localhost:8080')
})
