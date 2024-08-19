import {
  readFile,
  writeFile
} from 'node:fs/promises'
import transpile from '../src/transpile.js'
import validate from '../src/validate.js'


const content = JSON.parse(await readFile('./test/preview.json', { encoding: 'utf8' }))
const write = data => writeFile('./test/preview.html', data)

console.log('content', '::', content, '<<<::')

validate(content)
  .then(transpile)
  .then(write)
  .then(console.log)
  .catch(console.error)

// validate(content).then(transpile).then(write).then(console.log).catch(console.error)

// log(transpile([['div', { zzz: 9898 }, 'foo']]))
