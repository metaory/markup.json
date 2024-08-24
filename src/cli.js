#!/usr/bin/env node

import { argv, stdin, stdout } from 'node:process'
import { readFile, writeFile } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { ansi, usage } from './help.js'
import transpile from './transpile.js'
import validate from './validate.js'

process.title = 'markup'

const fail = (err = 'NA') => {
  ansi.b1(' ERROR ')
  ansi.f1('\n', err.message || err)

  usage()
  process.exit(1)
}

const readArg = () => {
  const [, , file] = argv

  if (!file) fail('NO FILE ARGUMENT or STANDARD INPUT')

  return readFile(file, { encoding: 'utf8' })
}

const readStream = () => {
  const stream = stdin.resume()

  if (stream.readable === false) fail('STREAM IS NOT READABLE')

  return Readable.from(stream).reduce((acc, cur) => (acc += cur), '')
}

const write = html => (stdin.isTTY && argv[3] ? writeFile(argv[3], html) : stdout.write(html))

;(stdin.isTTY ? readArg : readStream)()
  .then(JSON.parse)
  .then(validate)
  .then(transpile)
  .then(write)
  .catch(fail)

process.on('SIGINT', fail)
