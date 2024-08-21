import assert from 'node:assert/strict'

export default function (tpl) {
  assert.ok(Array.isArray(tpl), 'Array Expected')
  assert.ok(tpl.length, 'Empty Array Recieved')

  return Promise.resolve(tpl)
}
