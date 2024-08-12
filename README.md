<div align="center">
  <h3>mini-json2html</h3>
  <img src=".github/assets/json2html.svg" width="168px"/>
  <h4>Tiny JSON to HTML Transpiler</h4>
  <h5>Library and CLI</h5>
  <h4>with Zero dependencies</h4>
</div>

---

> [!Caution]
> 🚧 Under Development
>
> ⛔do not use

---

Library Usage
-------------

```sh
# install
npm install mini-json2html
# or
pnpm add mini-json2html
```

`sample.json`
```json
{
  "version": "0.1",
  "content": [
    [
      "div",
      {"align": "center", "class": "wrapper"},
      [
        ["img", {"src": "example.com"}],
        ["img", {"src": "google.com"}]
      ]
    ],
    [
      "footer",
      {"class": "foot"},
      [
        ["a", {"href": "foobar.com"}, ["p", {"class": "hoge"}, "some text"]],
        ["i", {"class":"icon"}, "xorg"]
      ]
    ]
  ]
}
```

```javascript
import { readFile } from 'node:fs/promises'
import { json2html } from 'mini-json2html'

const { content } = JSON.parse(await readFile('./sample.json', { encoding: 'utf8' }))
const html = json2html(content)

console.log(html)
```

`sample.html`
```html
<div align="center" class="wrapper">
	<img src="example.com" />
	<img src="google.com" />
</div>
<footer class="foot">
	<a href="foobar.com">
		<p class="hoge">some text</p>
	</a>
	<i class="icon">xorg</i>
</footer>
```

---

CLI Usage
---------

Read json input from stdin or argument and write result to stdout

```sh
# install globally
npm i -g mini-json2html
# or
pnpm add -g mini-json2html

# pipe json input and write result to a file
cat package.json | mini-json2html > package.html

# npx with input as argument and write result to stdout
npx mini-json2html sample.json
```

License
-------
[MIT](LICENSE)
