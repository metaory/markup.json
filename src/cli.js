#!/usr/bin/env node

import { argv, stdin } from 'node:process'
import { Readable } from 'node:stream'
import assert from 'node:assert/strict'
import transpile from './transpile.js'
import validate from './validate.js'

const [, , file] = argv
if (file) assert.fail('FILE ARG NOT_IMPLEMENTED')

const stream = stdin.resume()

if (stream.readable === false) process.exit()

Readable.from(stream)
  .reduce(async (acc, cur) => (acc += cur), '')
  .then(JSON.parse)
  .catch(assert.ifError)
  .then(validate)
  .then(transpile)
  .then(console.log)

process.on('SIGINT', process.exit)
