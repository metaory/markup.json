export default function (json) {
  let inner = ''
  let indent = ''
  function walk(nodes) {
    for (const node of nodes) {
      const [tag, attributes, content] = node || []
      inner += `${indent}<${tag}`
      for (const attr in attributes) {
        inner += ` ${attr}="${attributes[attr]}"`
      }
      if (content) {
        inner += '>'
        if (Array.isArray(content)) {
          const hasChildren = Array.isArray(content.at(0))
          indent += '\t'
          inner += '\n'
          walk((hasChildren && content) || [content])
          indent = indent.replace(/\t$/, '')
          inner += `${indent}</${tag}>\n`
        } else {
          inner += `${content}</${tag}>\n`
        }
      } else {
        inner += ' />\n'
      }
    }
  }

  walk(json)

  return inner
}
