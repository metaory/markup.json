#!/usr/bin/env node

import transpile from './transpile.js'
import validate from './validate.js'
import { Readable } from 'node:stream'

import { argv, stdin, stdout } from 'node:process'

const [, , file] = argv

if (file) {
  console.log('TODO HANDLE FILE ARG', `<${file}>`)
  process.exit(1)
}

const stream = stdin.resume()

if (stream.readable === false) process.exit()

Readable.from(stream)
  .reduce(async (acc, cur) => (acc += cur), '')
  .then(validate)
  .then(transpile)
  .then(console.log)


process.on('SIGINT', process.exit)

// readStream.isTTY
// const raw = await Readable.from(stream).reduce(async (acc, cur) => (acc += cur), '')
