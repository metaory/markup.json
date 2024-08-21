import { readFile, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import transpile from '../src/transpile.js'
import validate from '../src/validate.js'

const [, , input] = process.argv

assert.ok(input, 'this dev file requires the input path as argument')
assert.ok(input.endsWith('.json'), 'argument must be path to a json file')

const content = JSON.parse(await readFile(input, { encoding: 'utf8' }))
// const write = data => {
//   console.log('data', '::', data, '<<<::')
//   console.log('typeof data', '::', typeof data, '<<<::')
//   writeFile(input.replace('.json', '.html', data))
// }
const write = data => writeFile(input.replace('.json', '.html'), data)

assert.ok(content, 'missing json content')

console.log('content', '::', content, '<<<::')

validate(content)
  .then(transpile)
  .then(write)
  .then(console.log)
  .catch(console.error)

// validate(content).then(transpile).then(write).then(console.log).catch(console.error)

// node --watch-path=src/transpile.js --watch-path=test/social.json test/dev.js test/social.json
