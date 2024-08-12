import { readFile, writeFile, appendFile } from 'node:fs/promises'

const { log } = console

const { content } = JSON.parse(await readFile('./tests/basic.jsonc', { encoding: 'utf8' }))

const write = data => writeFile('./tests/basic.html', data)
const append = data => appendFile('./tests/basic.html', data)

await write('<!doctype html>\n\n')

let inner = ''
let indent = ''

async function walk(nodes) {
  log('\n -- WALK --\n', nodes, '\n -- ==== --\n')
  for (const node of nodes) {
    log('\t -- NODE --\n', node, '\n\t -- ==== --\n')
    const [tag, attributes, content] = node || []
    inner += `${indent}<${tag}`
    for (const attr in attributes) {
      log({ attr })
      inner += ` ${attr}="${attributes[attr]}"`
    }
    if (content) {
      inner += '>'
      if (Array.isArray(content)) {
        log(' ++ STEP IN', { content })
        const hasChildren = Array.isArray(content.at(0))
        indent += '\t'
        inner += '\n'
        walk((hasChildren && content) || [content])
        indent = indent.replace(/\t$/, '')
        inner += `${indent}</${tag}>\n`
      } else {
        log(' == STRING CONTENT')
        inner += `${content}</${tag}>\n`
      }
    } else {
      inner += ' />\n'
    }
  }
}

walk(content)

await append(inner)

