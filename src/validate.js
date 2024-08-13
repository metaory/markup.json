import assert from 'node:assert/strict'

export default function (tpl) {
  assert.ok(Array.isArray(tpl), 'Array Expected')
  assert.ok(tpl.length, 'Empty Array Recieved')

  const [root] = tpl
  assert.ok(Array.isArray(root), 'Root Is NOT Array')

  const [tag, attr] = root
  assert.ok(typeof tag === 'string', 'String Expected for Tag')
  assert.ok(typeof attr === 'object', 'Object Expected for Attributes')

  return Promise.resolve(tpl)
}
