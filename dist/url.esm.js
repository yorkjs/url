/**
 * url.js v0.0.1
 * (c) 2021 musicode
 * Released under the MIT License.
 */

const NULL = null;
const TRUE = true;
const FALSE = false;
const RAW_NULL = 'null';
const RAW_TRUE = 'true';
const RAW_FALSE = 'false';
const FLAG_ARRAY = '[]';
const STRING_EMPTY = '';

function parse$3(url) {
    const match = url.match(/(https?:)?\/\/([^:/?#]+)?(?::(\d*))?((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?(?:(#.*))?/i);
    if (match) {
        return {
            protocol: match[1] ? match[1].toLowerCase() : STRING_EMPTY,
            hostname: match[2] || STRING_EMPTY,
            port: match[3] || STRING_EMPTY,
            pathname: match[4] || '/',
            search: match[5] || STRING_EMPTY,
            hash: match[6] || STRING_EMPTY,
        };
    }
}
function stringify$3(url) {
    let { protocol, hostname, port, pathname, search, hash } = url;
    if (protocol && protocol.slice(-1) !== ':') {
        throw new Error('url.protocol must ends with ":".');
    }
    if (!hostname) {
        throw new Error('url.hostname is required.');
    }
    else {
        hostname = '//' + hostname;
    }
    if (port) {
        if (port.indexOf(':') === 0) {
            throw new Error('url.port must not starts with ":".');
        }
        port = ':' + port;
    }
    if (pathname === '/') {
        pathname = STRING_EMPTY;
    }
    if (search === '?') {
        search = STRING_EMPTY;
    }
    if (hash === '#') {
        hash = STRING_EMPTY;
    }
    return protocol
        + hostname
        + port
        + pathname
        + search
        + hash;
}

function parse$2(hash) {
    const match = hash.match(/((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?/i);
    if (match) {
        let pathname = match[1];
        if (typeof pathname === 'string' && pathname.indexOf('/') !== 0) {
            pathname = '/' + pathname;
        }
        return {
            pathname: pathname || '/',
            search: match[2] || STRING_EMPTY,
        };
    }
}
function stringify$2(hash) {
    return hash.pathname + hash.search;
}

/**
 * 把字符串 value 解析成最合适的类型
 */
function parse$1(value) {
    let result = +value;
    if (isNaN(result)) {
        if (value === RAW_TRUE) {
            result = TRUE;
        }
        else if (value === RAW_FALSE) {
            result = FALSE;
        }
        else if (value === RAW_NULL) {
            result = NULL;
        }
        else {
            result = decodeURIComponent(value);
        }
    }
    return result;
}
function stringify$1(value) {
    const type = typeof value;
    if (type === 'string') {
        return encodeURIComponent(value);
    }
    else if (type === 'number' || type === 'boolean') {
        return value.toString();
    }
    else if (value === NULL) {
        return RAW_NULL;
    }
}

/**
 * 把查询参数解析成对象
 */
function parse(query) {
    const result = {}, items = query.split('&');
    for (let i = 0, len = items.length; i < len; i++) {
        let [key, value] = items[i].split('=');
        if (typeof key === 'string' && typeof value === 'string') {
            key = key.trim();
            value = parse$1(value);
            if (key.slice(-FLAG_ARRAY.length) === FLAG_ARRAY) {
                key = key.slice(0, -FLAG_ARRAY.length).trim();
                const values = result[key] || (result[key] = []);
                values.push(value);
            }
            else {
                result[key] = value;
            }
        }
    }
    return result;
}
/**
 * 把对象序列化成 key1=value1&key2=value2
 */
function stringify(query) {
    const result = [];
    for (let key in query) {
        const value = query[key];
        if (Array.isArray(value)) {
            for (let i = 0, len = value.length; i < len; i++) {
                const valueStr = stringify$1(value[i]);
                if (typeof valueStr === 'string') {
                    result.push(`${key}${FLAG_ARRAY}=${valueStr}`);
                }
            }
        }
        else {
            const valueStr = stringify$1(value);
            if (typeof valueStr === 'string') {
                result.push(`${key}=${valueStr}`);
            }
        }
    }
    return result.length > 0
        ? result.join('&')
        : STRING_EMPTY;
}

const parseUrl = parse$3;
const stringifyUrl = stringify$3;
const parseHash = parse$2;
const stringifyHash = stringify$2;
const parseQuery = parse;
const stringifyQuery = stringify;
/**
 * 版本
 */
const version = "0.0.1";

export { parseHash, parseQuery, parseUrl, stringifyHash, stringifyQuery, stringifyUrl, version };
//# sourceMappingURL=url.esm.js.map
