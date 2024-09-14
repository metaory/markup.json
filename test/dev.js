import { readFile, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import transpile from '../src/transpile.js'
import validate from '../src/validate.js'
const { log, error } = console

const [, , input] = process.argv

assert.ok(input, 'this dev file requires the input path as argument')
assert.ok(input.endsWith('.json'), 'argument must be path to a json file')

const content = JSON.parse(await readFile(input, { encoding: 'utf8' }))
const write = data => {
  log(data)
  writeFile(input.replace('.json', '.html'), data)
}
console.log('input', '::', input, '<<<::')

assert.ok(content, 'missing json content')

log(content, '---')

validate(content).then(transpile).then(write).then(log).catch(error)

// node --watch-path=src/transpile.js --watch-path=test/social.json test/dev.js test/social.json
