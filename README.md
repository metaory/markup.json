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

### Designed around Array indices

---

<div align="center">
  <img alt="preview-json" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-json.png">
  <img alt="preview-html" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-html.png">
</div>

---

> [!Tip]
> Here are some real usage examples
>
> - [github.com/metaory/metaory/README.sh](https://github.com/metaory/metaory/blob/master/README.sh)
> - [github.com/metaory/hexocd-colorscheme/README.sh](https://github.com/metaory/hexocd-colorscheme/blob/master/README.sh)

---

Library Usage
-------------

```sh
# install
npm install markup.json
# or
pnpm add markup.json
```

---

```sh
cat .github/preview.json
```

```json
[
  ["h1", "marκup.json"],
  ["hr"],
  [
    "h4",
    "DOM tree",
    "representation in",
    ["i", "compact"],
    "JSON"
  ],
  [
    "a",
    {
      "class": "primary",
      "data-planet-id": "92432",
      "href": [
        "github.com/search?",
        {
          "q": "markup",
          "type": "repositories"
        }
      ],
      "style": {
        "color": "indigo",
        "background": "fuchsia"
      }
    },
    "🔥 First Class Attribute Strings"
  ],
  "Spec",
  "CLI",
  "Library"
]
```

```javascript
import { readFile } from 'node:fs/promises'
import markup from 'markup.json'

const opt = { encoding: 'utf8' }
const tpl = await readFile('./tpl.json', opt)

const html = markup(JSON.parse(tpl))
```

```html
<h1>
  marκup.json
</h1>
<hr />
<h4>
  DOM tree
  representation in
  <i>
    compact
  </i>
  JSON
</h4>
<a
  class="primary"
  data-planet-id="92432"
  href="github.com/search?q=markup&type=repositories"
  style="color: indigo; background: fuchsia;"
>
  🔥 First Class Attribute Strings
</a>
Spec
CLI
Library
```

---

CLI Installation
---------

```sh
# install globally
npm i -g markup.json
# or
pnpm add -g markup.json

# or with npx
npx markup.json
```

---

CLI Synopsis
------------

	markup [-]|FILE [FILE]


Reads input from **standard input** or **FILE**

Writes to `stdout` or FILE


---

CLI Usage
---------

```sh
  # read input and output path from args
markup [FILE] [FILE]
markup tpl.json index.html
    # or with npx
npx markup.json tpl.json index.html

  # read input path from args
  # write output to standard output
markup [FILE]
markup tpl.json
markup tpl.json > index.html
    # or with npx
npx markup.json tpl.json > index.html

  # read input from standard input
  # write output to standard output
cat FILE | markup
cat tpl.json | markup
cat tpl.json | markup > index.html
    # or with npx
cat tpl.json | npx markup.json > index.html

  # read from file descriptor
  # write output to standard output
markup < FILE
markup < tpl.json
markup < tpl.json > index.html
    # or with npx
npx markup.json < tpl.json > index.html
```


Types
-----

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

---

##### Primitive Attribute values
Attributes with Primitive values are rendered as is;
```json
[
  [
    "button",
    {
      "class": "primary btn",
      "name": "xorg"
    },
    "hi",
    ["b", "main"],
    "btn",
    "here"
  ]
]
```

```html
<button
  class="primary btn"
  name="xorg"
>
  hi
  <b> main </b>
  btn here
</button>
```

---

##### Attribute with Object values

Attributes with Object values are folded
delimit key and value pairs with `;`
delimit keys and values with `:`

```json
[
  ["h4", "Attribute with Object values"],
  [
    "span",
    {
      "class": "secondary",
      "style": {
        "color": "indigo",
        "background": "fuchsia"
      },
      "anything": {
        "name": "etc",
        "planet": "8e81"
      }
    },
    "Object values",
    ["b", "x11"],
    "xorg"
  ]
]
```

```html
<h4>Attribute with Object values</h4>
<span
  class="secondary"
  style="color: indigo; background: fuchsia"
  anything="name:etc; planet:8e81;"
>
  Object values
  <b> x11 </b>
  xorg
</span>
```

---

##### Attribute with Array values

Attributes with Object values are folded
delimit key and value pairs with `&`
delimit keys and values with `=`

```json
[
  ["h4", "Attribute with Array values"],
  [
    "a",
    {
      "class": "secondary",
      "href": [
        "github.com/search?",
        {
          "q": "markup",
          "type": "repositories",
          "l": "Lua"
        }
      ]
    },
    "go",
    ["b", "find"],
    "repos"
  ]
]
```
```html
<h4>Attribute with Array values</h4>
<a
  class="secondary"
  href="github.com/search?q=markup&type=repositories&l=Lua"
>
  go
  <b> find </b>
  repos
</a>
```

```json
[
  [
    "img",
    {
      "width": "80%",
      "alt": "stats",
      "src": [
        "github-readme-stats.vercel.app/api?",
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
]
```

```html
<img width="80%"
     alt="stats"
     src="github-readme-stats.vercel.app/api?username=metaory&ring_color=5522CC&text_color=44BBFF&border_radius=30&hide_title=true&hide_rank=false&show_icons=true" />
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
