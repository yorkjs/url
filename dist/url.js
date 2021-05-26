/**
 * url.js v0.0.1
 * (c) 2021 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Url = {}));
}(this, (function (exports) { 'use strict';

  var NULL = null;
  var TRUE = true;
  var FALSE = false;
  var RAW_NULL = 'null';
  var RAW_TRUE = 'true';
  var RAW_FALSE = 'false';
  var FLAG_ARRAY = '[]';
  var STRING_EMPTY = '';

  function parse$3(url) {
      var match = url.match(/(https?:)?\/\/([^:/?#]+)?(?::(\d*))?((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?(?:(#.*))?/i);
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
      var protocol = url.protocol;
      var hostname = url.hostname;
      var port = url.port;
      var pathname = url.pathname;
      var search = url.search;
      var hash = url.hash;
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
      var match = hash.match(/((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?/i);
      if (match) {
          var pathname = match[1];
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
      var result = +value;
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
      var type = typeof value;
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
      var result = {}, items = query.split('&');
      for (var i = 0, len = items.length; i < len; i++) {
          var ref = items[i].split('=');
          var key = ref[0];
          var value = ref[1];
          if (typeof key === 'string' && typeof value === 'string') {
              key = key.trim();
              value = parse$1(value);
              if (key.slice(-FLAG_ARRAY.length) === FLAG_ARRAY) {
                  key = key.slice(0, -FLAG_ARRAY.length).trim();
                  var values = result[key] || (result[key] = []);
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
      var result = [];
      for (var key in query) {
          var value = query[key];
          if (Array.isArray(value)) {
              for (var i = 0, len = value.length; i < len; i++) {
                  var valueStr = stringify$1(value[i]);
                  if (typeof valueStr === 'string') {
                      result.push(("" + key + FLAG_ARRAY + "=" + valueStr));
                  }
              }
          }
          else {
              var valueStr$1 = stringify$1(value);
              if (typeof valueStr$1 === 'string') {
                  result.push((key + "=" + valueStr$1));
              }
          }
      }
      return result.length > 0
          ? result.join('&')
          : STRING_EMPTY;
  }

  var parseUrl = parse$3;
  var stringifyUrl = stringify$3;
  var parseHash = parse$2;
  var stringifyHash = stringify$2;
  var parseQuery = parse;
  var stringifyQuery = stringify;
  /**
   * 版本
   */
  var version = "0.0.1";

  exports.parseHash = parseHash;
  exports.parseQuery = parseQuery;
  exports.parseUrl = parseUrl;
  exports.stringifyHash = stringifyHash;
  exports.stringifyQuery = stringifyQuery;
  exports.stringifyUrl = stringifyUrl;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=url.js.map
