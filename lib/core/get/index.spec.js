import test from 'ava'
import { identity } from '@meltwater/phi'
import createGetModel, { getQuery } from './index'

test('Check get model query', async t => {
  t.snapshot(getQuery('tableName', 'xxx', 'yyyy'))
})

test('Check get model', async t => {
  t.truthy(createGetModel)
  const getModel = createGetModel({
    config: {
      dynamodb: {
        defaultTableName: 'tableName'
      }
    },
    getFromTable: () => ({
      Item: {
        PartitionId: 'xxxx',
        SortKey: 'yyyy',
        IsActive: true
      }
    }),
    castInto: identity
  })
  t.truthy(getModel)
  const modelGottenModel = getModel({
    pathParameters: {
      partitionId: 'xxx',
      sortKey: 'uuu'
    }
  })
  t.truthy(modelGottenModel)
})
