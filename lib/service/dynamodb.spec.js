import test from 'ava'
import {
  createGetFromTable,
  createPutIntoTable,
  createUpdateTable,
  createListFromTable,
  createDeleteFromTable
} from './dynamodb'

test.before(async t => {
  t.context.sampleModel = {
    PartitionId: 'xxxx',
    SortKey: 'ssss'
  }
  t.context.params = { partitionId: 'xxx' }
})
test('Check create get from table', async t => {
  const { sampleModel, params } = t.context
  const dynamoDocumentClient = {
    get: () => ({
      promise: () => {
        t.pass()
        return sampleModel
      }
    })
  }
  createGetFromTable({ dynamoDocumentClient })(params)
})

test('Check put into table', async t => {
  const { sampleModel, params } = t.context
  const dynamoDocumentClient = {
    put: () => ({
      promise: () => {
        t.pass()
        return sampleModel
      }
    })
  }
  createPutIntoTable({ dynamoDocumentClient })(params)
})

test('Check update table', async t => {
  const { sampleModel, params } = t.context
  const dynamoDocumentClient = {
    update: () => ({
      promise: () => {
        t.pass()
        return sampleModel
      }
    })
  }
  createUpdateTable({ dynamoDocumentClient })(params)
})

test('Check list from table', async t => {
  const { sampleModel, params } = t.context
  const dynamoDocumentClient = {
    query: () => ({
      promise: () => {
        t.pass()
        return sampleModel
      }
    })
  }
  createListFromTable({ dynamoDocumentClient })(params)
})

test('Check scan from table', async t => {
  const { sampleModel, params } = t.context
  const dynamoDocumentClient = {
    scan: () => ({
      promise: () => {
        t.pass()
        return sampleModel
      }
    })
  }
  createListFromTable({ dynamoDocumentClient })(params, false)
})

test('Check delete from table', async t => {
  const { sampleModel, params } = t.context
  const dynamoDocumentClient = {
    delete: () => ({
      promise: () => {
        t.pass()
        return sampleModel
      }
    })
  }
  createDeleteFromTable({ dynamoDocumentClient })(params)
})
