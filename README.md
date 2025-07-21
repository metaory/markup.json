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
		First Class Attribute Strings
	</h3>
</div>
<hr />

---

<div align="center">
  <img alt="preview-json" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-json.png">
  <img alt="preview-html" src="https://raw.githubusercontent.com/metaory/markup.json/master/.github/assets/preview-html.png">
</div>

---

## 🎯 Where markup.json Shines

### **Functional XML Generation**
markup.json is the perfect functional tool for generating any XML-like output. Use it for HTML, SVG, RSS feeds, or any structured markup:

```bash
# Generate SVG from data
curl api.example.com/chart-data | jq 'transform_to_svg' | markup > chart.svg

# Generate RSS feed
curl api.example.com/posts | jq 'transform_to_rss' | markup > feed.xml

# Generate HTML portfolio
curl api.github.com/users/metaory/repos | jq 'transform_to_portfolio' | markup > portfolio.html
```

### **Unix Pipeline Integration**
Perfect synergy with `jq` for functional data transformation:
```bash
# One-liner: API → Transform → Markup → Output
curl api.example.com/data | jq '.[] | select(.active) | transform_to_card' | markup > cards.html
```

### **Configuration-Driven UI Generation**
Generate HTML from JSON configs without template engines:
```json
[
  "dashboard",
  ["h1", "User Dashboard"],
  ["div", {"class": "stats"},
    ["span", "Users: 1,234"],
    ["span", "Revenue: $56,789"]
  ]
]
```

### **API Response to HTML Transformation**
Convert API responses directly to HTML without intermediate steps:
```bash
curl api.example.com/users | jq 'transform_to_markup' | markup > users.html
```

### **Static Site Generation from Data**
Perfect for generating documentation, portfolios, or reports from structured data:
- **Documentation sites** from JSON schemas
- **Portfolio pages** from project metadata
- **Report generation** from analytics data

### **CLI Tools with Rich Output**
Create beautiful CLI outputs that can be piped to HTML:
```bash
git log --format=json | jq 'transform_to_changelog' | markup > changelog.html
```

### **Micro-Frontend Composition**
Compose UI components as JSON and render them:
```json
[
  "app",
  ["header", {"component": "nav"}],
  ["main", {"component": "dashboard"}],
  ["footer", {"component": "stats"}]
]
```

---

## 🌟 Unique Advantages

- **Zero Dependencies** - Pure JSON, no framework needed
- **Language Agnostic** - Works with any language that can generate JSON
- **Version Control Friendly** - JSON diffs are clean and readable
- **Pipeline Integration** - Perfect for Unix-style data processing
- **Schema Validation** - Can validate structure with JSON Schema
- **Template Composition** - Combine multiple JSON templates
- **Dynamic Attributes** - First-class support for complex attributes
- **Functional Style** - Pure functions, no side effects
- **XML Agnostic** - Generate any XML-like format (HTML, SVG, RSS, etc.)

---

## 🚀 Quick Start

### **Library Installation**
```sh
# install
npm install markup.json
# or
pnpm add markup.json
```

### **CLI Installation**
```sh
# install globally
npm i -g markup.json
# or
pnpm add -g markup.json

# or with npx
npx markup.json
```

### **Basic Usage**
```json
[
  "Hello",
  ["h1", "World"],
  ["p", "This is markup.json!"]
]
```

```bash
echo '["Hello", ["h1", "World"], ["p", "This is markup.json!"]]' | markup
```

---

<details>
<summary><strong>🤔 The Headless HTML Generation Problem</strong></summary>

Imagine you're in a CI environment with some JSON data and need to generate HTML. Here's how you'd solve it **without** markup.json:

### **Traditional Approach (Complex)**
```bash
# Option 1: Template Engine (Node.js)
npm install handlebars
node -e "
const Handlebars = require('handlebars');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json'));
const template = fs.readFileSync('template.hbs', 'utf8');
const compiled = Handlebars.compile(template);
fs.writeFileSync('output.html', compiled(data));
"

# Option 2: Python Template Engine
pip install jinja2
python -c "
import json
from jinja2 import Template
with open('data.json') as f: data = json.load(f)
with open('template.html') as f: template = Template(f.read())
with open('output.html', 'w') as f: f.write(template.render(**data))
"

# Option 3: Sed/Awk (Fragile)
cat data.json | jq -r '.items[] | "\(.name): \(.description)"' | \
awk '{print "<div><h3>" $1 "</h3><p>" $2 "</p></div>"}' > output.html
```

### **With markup.json (Simple)**
```bash
# One-liner: Data → Transform → HTML
cat data.json | jq 'transform_to_markup' | markup > output.html
```

**Why markup.json wins:**
- ✅ **No dependencies** - No npm/pip installs needed
- ✅ **Pure functional** - Single pipeline, no side effects
- ✅ **Version control friendly** - JSON templates are readable and diffable
- ✅ **Language agnostic** - Works with any tool that outputs JSON
- ✅ **CI/CD ready** - Perfect for automated environments

</details>

---

<details>
<summary><strong>📖 Complete Example</strong></summary>

> [!Tip]
> Here are some real usage examples
>
> - [metaory/README.sh](https://github.com/metaory/metaory/blob/master/README.sh)
> - [hexocd-colorscheme/README.sh](https://github.com/metaory/hexocd-colorscheme/blob/master/README.sh)

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

</details>

---

<details>
<summary><strong>📋 CLI Usage Examples</strong></summary>

## CLI Synopsis

	markup [-]|FILE [FILE]


Reads input from **standard input** or **FILE**

Writes to `stdout` or FILE


## CLI Usage

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
npx markup.json tpl.json > index.html
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

</details>

---

<details>
<summary><strong>🔧 Advanced Features & Types</strong></summary>

## Types

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

</details>

---

## License

[MIT](LICENSE)
