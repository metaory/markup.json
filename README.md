<div align="center">
  <h3>mini-json2html</h3>
  <img alt="logo" src="https://raw.githubusercontent.com/metaory/mini-json2html/master/.github/assets/json2html.svg" width="200px">
  <h4>Tiny JSON to HTML Transpiler</h4>
  <h5>Library and CLI</h5>
  <h4>with Zero dependencies</h4>
</div>

---

> [!Caution]
> 🚧  Under Development

---

<div align="center">
  <img alt="sample" width="80%" src="https://raw.githubusercontent.com/metaory/mini-json2html/master/.github/assets/preview-json.png">
  <img alt="sample" width="80%" src="https://raw.githubusercontent.com/metaory/mini-json2html/master/.github/assets/preview-html.png">
</div>

---

Library Usage
-------------

```sh
# install
npm install mini-json2html
# or
pnpm add mini-json2html
```

```sh
cat tests/sample.json
```

```json
{
  "lorem": "ipsum",
  "content": [
    [
      "div",
      { "align": "center", "class": "wrapper" },
      [
        ["img", { "src": "example.com" }],
        ["img", { "src": "google.com" }]
      ]
    ],
    [
      "footer",
      { "class": "foot" },
      [
        ["a", { "href": "foobar.com" }, ["p", { "class": "hoge" }, "foo"]],
        ["i", { "class": "icon", "x11" "xorg" }]
      ]
    ]
  ]
}
```
```sh
jq '.content' < tests/sample.json | json2html
```

```javascript
import { readFile } from 'node:fs/promises'
import json2html from 'mini-json2html'

const { content } = JSON.parse(await readFile('./sample.json', { encoding: 'utf8' }))
const html = json2html(content)

```

```html
<div align="center" class="wrapper">
        <img src="example.com" />
        <img src="google.com" />
</div>
<footer class="foot">
        <a href="foobar.com">
                <p class="hoge">foo</p>
        </a>
        <i class="icon" x11="xorg" />
</footer>
```

---

CLI Installation
---------
```sh
	# install globally
	npm i -g mini-json2html
	# or
	pnpm add -g mini-json2html
```

---

CLI Synopsis
------------

	json2html [-]|FILE


Reads input from **standard input** or **FILE**
The `-` is optional pointing to `stdin`

Writes the output to `stdout`


---

CLI Usage
---------

Read input from `stdin` and write result to `stdout`

```sh
cat content.json | json2html
```

Select and pipe a node with `jq` and redirect results to file

```sh
# pipe json input and write result to a file
jq '.content' < tests/sample.json | json2html > output.html
```

Read input from `argument` and write result to `stdout`

```sh
json2html content.json
```

```sh
# npx not tested
# npx mini-json2html sample.json
```

---

License
-------
[MIT](LICENSE)
