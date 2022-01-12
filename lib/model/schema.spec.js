import { identity, dissocPath } from '@meltwater/phi'
import test from 'ava'
import validateModel, { getSchema } from './schema'

test('Check model schema has not changed',
  async t => t.snapshot(dissocPath(['properties', 'sortKey'], getSchema())))
test('Check model validation', async t => {
  validateModel({ validateJson: identity })({
    partitionId: 'xxxxx',
    sortKey: '123',
    firstProperty: 'myFirstName',
    lastProperty: 'myLastName',
    isActive: true
  })
  t.pass()
})
