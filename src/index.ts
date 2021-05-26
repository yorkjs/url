import * as urlUtil from './url'
import * as hashUtil from './hash'
import * as queryUtil from './query'

export const parseUrl = urlUtil.parse
export const stringifyUrl = urlUtil.stringify

export const parseHash = hashUtil.parse
export const stringifyHash = hashUtil.stringify

export const parseQuery = queryUtil.parse
export const stringifyQuery = queryUtil.stringify

/**
 * 版本
 */
export const version = process.env.NODE_VERSION