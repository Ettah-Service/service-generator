import test from 'ava'
import createValidator from './validate-json'

test('Check json validation', async t => {
  t.truthy(createValidator)
})

test('Check json validation can validate', async t => {
  t.truthy(createValidator()({
    schema: {
      additionalProperties: true
    },
    data: {
      firstProperty: 'NameFirst',
      lastProperty: 'NameLast'
    }
  }))
})

test('Check json validation can throw when validation fails', async t => {
  const throwingFnx = () => createValidator()({
    schema: {
      additionalProperties: false
    },
    data: {
      firstProperty: 'NameFirst',
      lastProperty: 'NameLast'
    }
  })
  t.throws(throwingFnx, { instanceOf: Error })
})
