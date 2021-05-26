import {
  NULL,
  TRUE,
  FALSE,
  RAW_NULL,
  RAW_TRUE,
  RAW_FALSE,
} from './constant'

/**
 * 把字符串 value 解析成最合适的类型
 */
export function parse(value: string) {
  let result: any = +value
  if (isNaN(result)) {
    if (value === RAW_TRUE) {
      result = TRUE
    }
    else if (value === RAW_FALSE) {
      result = FALSE
    }
    else if (value === RAW_NULL) {
      result = NULL
    }
    else {
      result = decodeURIComponent(value)
    }
  }
  return result
}

export function stringify(value: any): string | undefined {
  const type = typeof value
  if (type === 'string') {
    return encodeURIComponent(value)
  }
  else if (type === 'number' || type === 'boolean') {
    return value.toString()
  }
  else if (value === NULL) {
    return RAW_NULL
  }
}