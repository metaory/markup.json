const LB = '\n'
const TB = ' '.repeat(2)

const indent = n => TB.repeat(n)

const foldString = (obj, sep = '&', eq = '=', pre = '') =>
  pre +
  Object.keys(obj)
    .reduce((str, key) => (str += key + eq + obj[key] + sep), '')
    .trim()

const foldAttributes = (attr, depth) =>
  Object.keys(attr).reduce((acc, cur) => {
    const val = attr[cur]

    acc += LB
    acc += indent(depth + 1)
    acc += cur
    acc += '="'

    switch (val.constructor) {
      case Object:
        acc += foldString(val, '; ', ':')
        break
      case Array:
        acc += foldString(val.at(1), '&', '=', val.at(0))
        break
      case String:
        acc += val
    }

    return acc + '"'
  }, '')

export default function (arr) {
  let html = ''

  function walk(nodes, depth = 0) {
    for (const node of nodes) {
      if (node.constructor === String) {
        html += node
        html += LB
        continue
      }

      const [tag] = node

      html += indent(depth)
      html += '<'
      html += tag

      const [attr, ...frags] = node
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
        html += LB
        html += indent(depth)
      }

      if (!frags.length) {
        html += ' />'
        html += LB
        continue
      }

      html += '>'
      html += LB

      for (const frag of frags) {
        if (frag.constructor === Array) walk([frag], depth + 1)
        else {
          html += indent(depth + 1)
          html += frag
          html += LB
        }
      }

      html += indent(depth)
      html += `</${tag}>`
      html += LB
    }
  }

  walk(arr)

  return html
}
