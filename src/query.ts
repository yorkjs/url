import * as valueUtil from './value'

import {
  FLAG_ARRAY,
  STRING_EMPTY,
} from './constant'

/**
 * 把查询参数解析成对象
 */
export function parse(query: string) {

  const result: object = { }, items = query.split('&')

  for (let i = 0, len = items.length; i < len; i++) {

    let [key, value] = items[i].split('=')

    if (typeof key === 'string' && typeof value === 'string') {

      key = key.trim()

      value = valueUtil.parse(value)

      if (key.slice(-FLAG_ARRAY.length) === FLAG_ARRAY) {
        key = key.slice(0, -FLAG_ARRAY.length).trim()

        const values = result[key] || (result[key] = [])
        values.push(value)
      }
      else {
        result[key] = value
      }
    }

  }

  return result

}

/**
 * 把对象序列化成 key1=value1&key2=value2
 */
export function stringify(query: object) {

  const result: string[] = [ ]

  for (let key in query) {
    const value = query[key]
    if (Array.isArray(value)) {
      for (let i = 0, len = value.length; i < len; i++) {
        const valueStr = valueUtil.stringify(value[i])
        if (typeof valueStr === 'string') {
          result.push(
            `${key}${FLAG_ARRAY}=${valueStr}`
          )
        }
      }
    }
    else {
      const valueStr = valueUtil.stringify(value)
      if (typeof valueStr === 'string') {
        result.push(
          `${key}=${valueStr}`
        )
      }
    }
  }

  return result.length > 0
    ? result.join('&')
    : STRING_EMPTY

}
