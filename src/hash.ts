import {
  STRING_EMPTY,
} from './constant'

type Hash = {
  pathname: string
  search: string
}

export function parse(hash: string): Hash | undefined {

  const match = hash.match(/((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?/i)
  if (match) {
    let pathname = match[1]
    if (typeof pathname === 'string' && pathname.indexOf('/') !== 0) {
      pathname = '/' + pathname
    }
    return {
      pathname: pathname || '/',
      search: match[2] || STRING_EMPTY,
    }
  }

}

export function stringify(hash: Hash) {
  return hash.pathname + hash.search
}