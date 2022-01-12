import test from 'ava'
import modelSpec from '../../fixtures/data/model.json'
import nextDbSpec from '../../fixtures/data/db-next.json'
import attributeNameLookUp from '../model/map.json'
import createValidateModel from '../model/schema'
import createCastTo, { allowedModelNames } from './cast-to'
import createValidateJson from '../util/validate-json'

test.beforeEach(async t => {})
test('Check allowed model name', async t => t.snapshot(allowedModelNames))
test('Check conversion is consistent', async t => {
  const validateJson = createValidateJson()
  const validateModel = createValidateModel({ validateJson })
  const castTo = createCastTo({ attributeNameLookUp, validateModel })
  t.snapshot(castTo('model', 'db:next', modelSpec))
  t.snapshot(castTo('db:next', 'model', nextDbSpec))
  t.throws(() => castTo('db:next:next', 'model', nextDbSpec), { instanceOf: Error })
})
