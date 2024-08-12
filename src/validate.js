// import assert from 'node:assert/strict'
import transpile from './transpile.js'

export default function (raw) {
  try {
    // TODO VALIDATE SCHEMA
    // console.log('VAL', raw, '<<<')
    // return Promise.resolve(transpile(JSON.parse(raw)))
    return Promise.resolve(JSON.parse(raw))
  } catch (err) {
    console.error('ERR', err.message)
    process.exit(1)
  }
}
