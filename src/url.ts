import {
  STRING_EMPTY,
} from './constant'

type Url = {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
}

export function parse(url: string): Url | undefined {

  const match = url.match(/(https?:)?\/\/([^:/?#]+)?(?::(\d*))?((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?(?:(#.*))?/i)
  if (match) {
    return {
      protocol: match[1] ? match[1].toLowerCase() : STRING_EMPTY,
      hostname: match[2] || STRING_EMPTY,
      port: match[3] || STRING_EMPTY,
      pathname: match[4] || '/',
      search: match[5] || STRING_EMPTY,
      hash: match[6] || STRING_EMPTY,
    }
  }

}

export function stringify(url: Url) {
  let { protocol, hostname, port, pathname, search, hash } = url
  if (protocol && protocol.slice(-1) !== ':') {
    throw new Error('url.protocol must ends with ":".')
  }
  if (!hostname) {
    throw new Error('url.hostname is required.')
  }
  else {
    hostname = '//' + hostname
  }
  if (port) {
    if (port.indexOf(':') === 0) {
      throw new Error('url.port must not starts with ":".')
    }
    port = ':' + port
  }
  if (pathname === '/') {
    pathname = STRING_EMPTY
  }
  if (search === '?') {
    search = STRING_EMPTY
  }
  if (hash === '#') {
    hash = STRING_EMPTY
  }
  return protocol
    + hostname
    + port
    + pathname
    + search
    + hash
}