
export default function (arr) {
  let inner = ''
  let indent = ''
  function walk(nodes) {
    for (const node of nodes) {
      const [tag, attributes, val] = node || []
      inner += `${indent}<${tag}`
      for (const attr in attributes) {
        inner += ` ${attr}="${attributes[attr]}"`
      }
      if (val) {
        inner += '>'
        if (Array.isArray(val)) {
          const hasChildren = Array.isArray(val.at(0))
          indent += '\t'
          inner += '\n'
          walk((hasChildren && val) || [val])
          indent = indent.replace(/\t$/, '')
          inner += `${indent}</${tag}>\n`
        } else {
          inner += `${val}</${tag}>\n`
        }
      } else {
        inner += ' />\n'
      }
    }
  }

  walk(arr)

  return inner
}
