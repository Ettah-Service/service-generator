import test from 'ava'
import createUpdateModel, { getQuery } from './index'

test.before(async t => {
  t.context.attributeNameLookUp = [{
    'db:next': 'FirstProperty',
    model: 'firstProperty'
  }]
})
test('Check get model query', async t => {
  const { attributeNameLookUp } = t.context
  t.snapshot(getQuery({
    attributeNameLookUp,
    tableName: 'tableName',
    partitionId: 'xxx',
    sortKey: 'yyyy',
    patch: {
      fieldName: 'firstProperty',
      remove: true,
      replace: 'firstNameProperty'
    }
  }))

  t.snapshot(getQuery({
    attributeNameLookUp,
    tableName: 'tableName',
    partitionId: 'xxx',
    sortKey: 'yyyy',
    patch: {
      fieldName: 'firstProperty',
      remove: false,
      replace: 'firstNameProperty'
    }
  }))
})

test('Check update model', async t => {
  const { attributeNameLookUp } = t.context
  t.truthy(createUpdateModel)
  const updateModel = createUpdateModel({
    config: {
      dynamodb: {
        defaultTableName: 'tableName'
      }
    },
    updateTable: () => ({
      etag: 'xxxxxxxxxx'
    }),
    attributeNameLookUp
  })
  t.truthy(updateModel)
  const updateResult = updateModel({
    pathParameters: {
      partitionId: 'xxx',
      sortKey: 'uuu'
    },
    body: [{
      fieldName: 'firstProperty',
      remove: false,
      replace: 'firstNameProperty'
    }]
  })
  t.truthy(updateResult)
})

test('Check update model without a patch body', async t => {
  const { attributeNameLookUp } = t.context
  const updateModel = createUpdateModel({
    config: {
      dynamodb: {
        defaultTableName: 'tableName'
      }
    },
    updateTable: () => ({
      etag: 'xxxxxxxxxx'
    }),
    attributeNameLookUp
  })
  const updateResult = updateModel({
    pathParameters: {
      partitionId: 'xxx',
      sortKey: 'uuu'
    }
  })
  t.truthy(updateResult)
})

test('Check update model failed results', async t => {
  const { attributeNameLookUp } = t.context
  const updateModel = createUpdateModel({
    config: {
      dynamodb: {
        defaultTableName: 'tableName'
      }
    },
    updateTable: () => { throw new Error('Update failed') },
    attributeNameLookUp
  })
  const updateResult = updateModel({
    pathParameters: {
      partitionId: 'xxx',
      sortKey: 'uuu'
    },
    body: [{
      fieldName: 'firstProperty',
      remove: false,
      replace: 'firstNameProperty'
    }]
  })
  t.truthy(updateResult)
})
