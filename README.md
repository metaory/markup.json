<div align="center">
	<h1>
		MARKUP.json
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
  "Hello World 🦊",
  ["h1", "MARKUP.json"],
  ["hr"],
  "DOM tree",
  ["h4", "representation", "in compact JSON"],
  [
    "a",
    {
      "align": "center",
      "class": "primary",
      "data-planet-id": "92432",
      "href": ["search?", { "q": "foo", "type": "bar" }],
      "id": "hoge",
      "style": { "color": "indigo", "background": "fuchsia" }
    },
    "🔥 First Class Attribute Strings"
  ]
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
Hello World 🦊
<h1>MARKUP.json</h1>
<hr />
DOM tree
<h4>
  representation
  in compact JSON
</h4>
<a align="center"
   class="primary"
   data-planet-id="92432"
   href="search?q=foo&type=bar&"
   id="hoge"
   style="color:indigo; background:fuchsia;"
>
  🔥 First Class Attribute Strings
</a>
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

---

Spec Draft
----------

Every element is a new line
Array's first element is the TAG
<br />
Both Attribute and Value can be omitted
<p class="primary">
	second element is the attribute object
</p>
<em>
	attributes are optional
</em>
<em>
	elements
	can have
	many children
</em>
<em>
	every child
	is a new line
</em>
values are optional
<b class="opt" />
<hr />
Attributes with
<em>
	Array
</em>
or
<em>
	Object
</em>
are treated differently
<br />
<h4>
	Array Attributes
</h4>
<a class="link" href="https://github.com/search?q=html.json&type=repositories&">
	Attributes with Array as value
	joined with
	<em>
		semicolon
	</em>
	and equal sign to delimit keys and values
</a>
<h4>
	Object Attributes
</h4>
<div class="wrapper" style="color:indigo; background:fuchsia;">
	elements can
	be nested
	<span>
		arrays as values are children
	</span>
	<em class="fuga">
		nested
	</em>
	<p>
		children can have
		<b>
			children!
		</b>
	</p>
</div>
<hr />
Attributes with primitive values are rendered as they are written
<br foo="bar" x11="xorg" />


Spec Draft Notes
----------------


> [!Note]
> The values `"true"` and `"false"` are not allowed on boolean attributes.
> To represent a false value, the attribute has to be omitted altogether.
>
> _ref:_ [2.3.2 Boolean attributes -- html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)



License
-------
[MIT](LICENSE)
