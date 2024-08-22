<div align="center">
	<h1>
		mʌrκup.json
	</h1>
  <img alt="logo" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/markup.svg" width="200px">
	<hr />
	<h5>
		HTML DOM tree representation in compact JSON
	</h5>
	<h3>
		First Class Support for Attributes String
	</h3>
</div>
<hr />
Designed around Array indices

---

> [!Caution]
> 🚧  Under Development

---

<div align="center">
  <img alt="preview-json" width="80%" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-json.png">
  <img alt="preview-html" width="80%" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-html.png">
</div>

---


> [!Tip]
> Most of this readme is created from
> [test/preview.json](https://github.com/metaory/markup.json/blob/master/test/preview.json)

---

Library Usage
-------------

```sh
# install
npm install markup.json
# or
pnpm add markup.json
```

```sh
cat tests/mini.json
```

```json
[
  ["h1", "mʌrκup.json"],
  ["br"],
  ["h4", "DOM tree", "representation", "in compact JSON"],
  [
    "a",
    {
      "class": "primary",
      "data-planet-id": "92432",
      "href": ["search?", { "q": "foo", "type": "bar" }],
      "style": { "color": "indigo", "background": "fuchsia" }
    },
    "🔥 First Class Attribute Strings"
  ],
  "draft spec 0.7"
]
```

```sh
markup < tests/sample.json
```

```javascript
import { readFile } from 'node:fs/promises'
import markup from 'markup.json'

const content = JSON.parse(await readFile('./mini.json', { encoding: 'utf8' }))
const html = markup(content)

```

```html
<h1>
	mʌrκup.json
</h1>
<br />
<h4>
	DOM tree
	representation
	in compact JSON
</h4>
<a
  class="primary"
  data-planet-id="92432"
  href="search?q=foo&type=bar&"
  style="color:indigo; background:fuchsia;"
>
	🔥 First Class Attribute Strings
</a>
draft spec 0.7
```

---

CLI Installation
---------

```sh
# install globally
npm i -g markup.json
# or
pnpm add -g markup.json
```

---

CLI Synopsis
------------

	markup.json [-]|FILE


Reads input from **standard input** or **FILE**
The `-` is optional pointing to `stdin`

Writes the output to `stdout`


---

CLI Usage
---------

Read input from `stdin` and write result to `stdout`

```sh
cat content.json | markup
```

Select and pipe a node with `jq` and redirect results to file

```sh
# pipe json input and write result to a file
jq '.content' < tests/sample.json | markup > output.html
```

Read input from `argument` and write result to `stdout`

```sh
markup content.json
```

```sh
# npx not tested
# npx markup.json sample.json
```

Type Draft
----------

```ts
type Tag = string

type primitive = string | number | boolean

type AttributeString = [string, { [k: string]: primitive }]

type Attribute =
  | { [k: string]: primitive | AttributeString | object }
  | primitive

type Node = [Tag, Attribute?, ...primitive[]] | string

type Markup = Node[]
```

##### Primitive Attribute values
Attributes with Primitive values are rendered as is;
```json
[
  "button",
  { class: "primary btn", name: "xorg" },
  "hi",
  "main btn"
]
```

```html
<button class="primary btn" name="xorg" >
  hi
  main btn
</button>
```

##### Attribute with Object values

Attributes with Object values are folded
delimit key and value pairs with `;`
delimit keys and values with `:`

```json
[
  "span",
  {
    "class": "secondary",
    "style": { "color": "indigo", "background": "fuchsia" },
    "anything": { "name": "etc", "planet": "8e81" }
  },
  "Object values",
  "xorg"
]
```

```html
<span class="secondary"
      style="color:indigo; background:fuchsia;"
      anything="name:etc; planet:8e81;">
  Object values
  xorg
</span>
```

##### Attribute with Array values

Attributes with Object values are folded
delimit key and value pairs with `&`
delimit keys and values with `=`

```json
[
  "a",
  {
    "class": "secondary",
    "href": [
      "https://github.com/search",
      { "q": "markup", "type": "repositories", "l": "Lua" }
    ]
  },
  "go",
  "find repos"
]
```
```html
<a class="secondary"
   href="https://github.com/searchq=markup&type=repositories&l=Lua&">
  go
  find repos
</a>
```

```json
[
  "img",
  {
    "width": "80%",
    "alt": "stats",
    "src": [
      "https://github-readme-stats.vercel.app/api?",
      {
        "username": "metaory",
        "ring_color": "5522CC",
        "text_color": "44BBFF",
        "border_radius": 30,
        "hide_title": true,
        "hide_rank": false,
        "show_icons": true
      }
    ]
  }
]
```

```html
<img width="80%"
     alt="stats"
     src="https://github-readme-stats.vercel.app/api?username=metaory&ring_color=5522CC&text_color=44BBFF&border_radius=30&hide_title=true&hide_rank=false&show_icons=true&" />
```
---


Draft Notes
-----------


> [!Note]
> The values `"true"` and `"false"` are not allowed on boolean attributes.
> To represent a false value, the attribute has to be omitted altogether.
>
> _ref:_ [2.3.2 Boolean attributes -- html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)



License
-------
[MIT](LICENSE)
