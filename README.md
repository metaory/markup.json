<div align="center">
	<h1>
		mʌrκup.json
	</h1>
  <img alt="logo" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/markup.svg" width="200px">
	<hr />
	<h4>
		DOM Markup Abstract Syntax Tree representation in compact JSON
	</h4>
  <h5>
		Specification, Transformer Library and CLI
  </h5>
	<h3>
		First Class Support for Attributes String
	</h3>
</div>
<hr />

---

<div align="center">
  <img width="48%" alt="preview-json" valign="top" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-json.png">
  <img width="48%" alt="preview-html" valign="top" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-html.png">
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
  "headless",
  "",
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
headless

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
  href="github.com/search?q=markup&type=repositories&"
  style="color:indigo; background:fuchsia;"
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
```

```sh
  # read input path from args
  # write output to standard output
markup [FILE]
markup tpl.json
markup tpl.json > index.html
    # or with npx
npx markup.json tpl.json > index.html
```

```sh
  # read input from standard input
  # write output to standard output
cat FILE | markup
cat tpl.json | markup
cat tpl.json | markup > index.html
    # or with npx
cat tpl.json | npx markup.json > index.html
```

```sh
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

#### Primitive Attribute values
Attributes with Primitive values are rendered as is;

```json
[
  "top level",
  "can be without tag",
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
top level
can be without tag
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

> [!Tip]
> Attributes can come at any position after tag

```json
[
  "attributes open",
  "position",
  [
    "button",
    "hell",
    {
      "class": "primary btn",
      "name": "xorg"
    },
    "OoO",
    ["b", "main"],
    "btn",
    "here"
  ]
]
```

```html
attributes open
position
<button
  class="primary btn"
  name="xorg"
>
  hell
  OoO
  <b>
    main
  </b>
  btn
  here
</button>
```

---

> [!Tip]
> Repeated attributes will merge

```json
[
  "repeated",
  "attributes",
  [
    "button",
    {
      "class": "primary btn",
      "name": "xorg"
    },
    "hi",
    { "class": "shadowed", "id": "usr" },
    ["b", "main"],
    "btn",
    "here"
  ],
  "EO"
]
```

```html
repeated
attributes
<button
  class="shadowed"
  name="xorg"
  id="usr"
>
  hi
  <b>
    main
  </b>
  btn
  here
</button>
EO
```

---


#### Attribute with Object values

Attributes with Object values are folded
delimit key and value pairs with `;`
delimit keys and values with `:`

```json
[
  "OBJ Values",
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
OBJ Values
<h4>
  Attribute with Object values
</h4>
<span
  class="secondary"
  style="color:indigo; background:fuchsia;"
  anything="name:etc; planet:8e81;"
>
  Object values
  <b>
    x11
  </b>
  xorg
</span>
```

---

#### Attribute with Array values

Attributes with Object values are folded
delimit key and value pairs with `&`
delimit keys and values with `=`

```json
[
  "begin",
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
begin
<h4>
  Attribute with Array values
</h4>
<a
  class="secondary"
  href="github.com/search?q=markup&type=repositories&l=Lua&"
>
  go
  <b>
    find
  </b>
  repos
</a>
```

```json
[
  "attributes with",
  "array values",
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
attributes with
array values
<img
  width="80%"
  alt="stats"
  src="github-readme-stats.vercel.app/api?username=metaory&ring_color=5522CC&text_color=44BBFF&border_radius=30&hide_title=true&hide_rank=false&show_icons=true&"
 />
```

---

> [!Tip]
> Values are normalized with Unicode NFC Form Canonical Composition
>
> `"\u0041\u006d\u00e9\u006c\u0069\u0065"`
> would be `"Amélie"`
>
> _ref:_ [Unicode_equivalence](https://en.wikipedia.org/wiki/Unicode_equivalence)

---

> [!Note]
> The values `"true"` and `"false"` are not allowed on boolean attributes.
> To represent a false value, the attribute has to be omitted altogether.
>
> _ref:_ [2.3.2 Boolean attributes -- html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)

```json
[
  "Boolean attributes",
  ["hr"],
  [
    "label",
    [
      "input",
      {
        "type": "checkbox",
        "name": "cheese",
        "disabled": false,
        "checked": true
      }
    ],
    "Cheese"
  ]
]
```
```html
Boolean attributes
<hr />
<label>
  <input
    type="checkbox"
    name="cheese"
    checked
   />
  Cheese
</label>
```

---

License
-------
[MIT](LICENSE)
