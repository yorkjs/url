# url

整合 url 常用的工具方法。

## 安装

CDN

```html
<script src="https://unpkg.com/@yorkjs/url"></script>
<script>
  Url.parseUrl(location.href)
</script>
```

NPM

```shell
npm install @yorkjs/url
```

```js
import Url from '@yorkjs/url'
Url.parseUrl(location.href)
```

YARN

```shell
yarn add @yorkjs/url
```

```js
import Url from '@yorkjs/url'
Url.parseUrl(location.href)
```

## API

### parseUrl(urlStr)

把 url 字符串解析成对象，对象格式如下：

```js
{
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
}
```

### stringifyUrl(urlObject)

把 url 对象（格式如上）序列化成字符串。

### parseHash(hashStr)

把 hash 字符串（不能有开头的 `#`）解析成对象，对象格式如下：

```js
{
  pathname: string
  search: string
}
```

> 此方法常用于单页应用的 hash mode。

### stringifyHash(hashObject)

把 hash 对象（格式如上）序列化成字符串，不包含开头的 `#`。

> 此方法常用于单页应用的 hash mode。

### parseQuery(queryStr)

把 query 字符串（不能有开头的 `?`）解析成对象。

### stringifyQuery(queryObject)

把 query 对象序列化成字符串，不包含开头的 `?`。

## 兼容性

全平台适用，但需要确认以下函数是否存在：

```
String.prototype.trim
Array.isArray
```

如不存在，请自行打补丁。