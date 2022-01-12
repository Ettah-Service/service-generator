import test from 'ava'
import {
  noop,
  identity,
  always
} from '@meltwater/phi'
import createCreateModel, { getQuery } from './index'

test('Check create model query', async t => {
  t.snapshot(getQuery('tableName', {
    PartitionId: 'partion id',
    SortKey: 'sort key'
  }))
})
test('Check create model', async t => {
  t.truthy(createCreateModel)
  const createModel = createCreateModel({
    config: {
      dynamodb: {
        defaultTableName: 'tableName'
      }
    },
    putIntoTable: noop,
    castInto: always(identity)
  })
  t.truthy(createModel)
  const modelCreationModel = createModel({
    partitionId: 'xxx',
    sortKey: 'uuu'
  })
  t.truthy(modelCreationModel)
})
