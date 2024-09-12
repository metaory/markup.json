const LB = '\n'
const TB = '\t'

const foldString = (obj, sep = '&', eq = '=', pre = '') =>
  pre +
  Object.keys(obj)
    .reduce((str, key) => (str += key + eq + obj[key] + sep), '')
    .trim()

const foldAttributes = attributes =>
  Object.keys(attributes).reduce((acc, cur) => {
    const val = attributes[cur]

    acc += ` ${cur}="`

    switch (val.constructor) {
      case String:
        acc += val
        break
      case Object:
        acc += foldString(val, '; ', ':')
        break
      case Array:
        acc += foldString(val.at(1), '&', '=', val.at(0))
        break
    }
    acc += '"'
    return acc
  }, '')

const indent = n => Array(n).fill(TB).join('')

export default function (arr) {
  let html = ''

  function walk(nodes, depth = 0) {
    for (const node of nodes) {
      const [tag, ...parts] = node || []

      if (node.constructor === String) {
        html += node
        html += LB
        continue
      }

      html += indent(depth)
      html += '<'
      html += tag

      const [attributes = {}] = parts

      if (attributes.constructor === Object) {
        html += foldAttributes(attributes)
        parts.shift()
      }

      if (!parts.length) {
        html += ' />'
        html += LB
        continue
      }

      html += '>'
      html += LB

      for (const line of parts) {
        if (typeof line !== 'object') {
          html += indent(depth)
          html += TB
          html += line
          html += LB
        }

        if (Array.isArray(line)) walk([line], depth + 1)
      }

      html += indent(depth)
      html += `</${tag}>`
      html += LB
    }
  }

  walk(arr)

  return html
}
