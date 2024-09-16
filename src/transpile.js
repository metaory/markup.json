const LF = '\n' // Line Feed
const HT = ' '.repeat(2) // Horizontal Tab

const indent = n => HT.repeat(n)

const normalize = x => String(x).normalize().trim()

const foldString = (obj, sep = '&', eq = '=', pre = '') =>
  '="' +
  pre +
  Object.keys(obj)
    .reduce((str, key) => (str += key + eq + obj[key] + sep), '')
    .trim() +
  '"'

const foldAttributes = (attr, depth) =>
  Object.keys(attr).reduce((acc, cur) => {
    const val = attr[cur]

    if (val === null) return acc

    const pre = LF + indent(depth + 1) + cur

    switch (val.constructor) {
      case Object:
        acc += pre + foldString(val, '; ', ':')
        break
      case Array:
        acc += pre + foldString(val.at(1), '&', '=', val.at(0))
        break
      case Boolean:
        if (val ===  true) acc += pre
        break
      case String:
      case Number:
        acc += `${pre}="${normalize(val)}"`
    }

    return acc
  }, '')

export default function (arr) {
  let html = ''

  function walk(nodes, depth = 0) {
    for (const node of nodes) {
      if (node === null) continue
      if (typeof node !== 'object') {
        html += normalize(node) + LF
        continue
      }

      const [tag] = node

      html += indent(depth) + '<' + tag

      const [attr, ...fragment] = node
        .slice(1)
        .reduce(
          ([attr, ...acc], cur) =>
            cur.constructor === Object
              ? [{ ...attr, ...cur }, ...acc]
              : [attr, ...acc, cur],
          [{}]
        )

      html += foldAttributes(attr, depth)

      if (Object.keys(attr).length) {
        html += LF + indent(depth)
      }

      if (!fragment.length) {
        html += ' />' + LF
        continue
      }

      html += '>' + LF

      for (const part of fragment) {
        if (part.constructor === Array) walk([part], depth + 1)
        else {
          html += indent(depth + 1)
          html += normalize(part)
          html += LF
        }
      }

      html += indent(depth)
      html += `</${tag}>`
      html += LF
    }
  }

  walk(arr)

  return html
}
