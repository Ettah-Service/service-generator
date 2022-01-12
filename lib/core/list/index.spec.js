import test from 'ava'
import {
  identity
} from '@meltwater/phi'
import createListModel, {
  convertToReplacementContext,
  compileQueryTemplate,
  getQuery
} from './index'
import { toBase64 } from '../../util/base64'

test.before(async t => {
  t.context.attributeNameLookUp = [
    {
      'db:next': 'PartitionId',
      model: 'partitionId'
    },
    {
      'db:next': 'SortKey',
      model: 'sortKey'
    },
    {
      'db:next': 'FirstProperty',
      model: 'firstProperty'
    }
  ]
})
test('Check convert to replacement context', async t => {
  const { attributeNameLookUp } = t.context
  t.snapshot(convertToReplacementContext(attributeNameLookUp))
})

test('Check  compile template', async t => {
  t.snapshot(compileQueryTemplate({
    '{{tableName}}': 'myTablename',
    '{{scanIndexForward}}': true
  }, '{"tableName": "{{tableName}}", "scanIndexForward": {{scanIndexForward}} }'))
})

test('Check get query without query param', async t => {
  const { attributeNameLookUp } = t.context
  t.pass(getQuery({
    tableName: 'customTableName',
    attributeNameLookUp,
    queryStringParameters: {}
  }))
})

test('Check get query with query param ', async t => {
  const { attributeNameLookUp } = t.context
  const query = `{
    "TableName": "TableName",
    "IndexName": "{{partitionId}}",
    "KeyConditionExpression": "{{partitionId}} = :hkey and {{sortKey}} > :rkey",
    "ExpressionAttributeValues": {
      ":hkey": "key",
      ":rkey": 2015
    }
  }`
  const notEncodeded = getQuery({
    tableName: 'customTableName',
    attributeNameLookUp,
    queryStringParameters: { query, isBase64Encoded: false }
  })

  const encodeded = getQuery({
    tableName: 'customTableName',
    attributeNameLookUp,
    queryStringParameters: {
      query: toBase64(query),
      isBase64Encoded: true
    }
  })
  t.snapshot(notEncodeded)
  t.snapshot(encodeded)
})

test('Check list models', async t => {
  const { attributeNameLookUp } = t.context
  t.truthy(createListModel)
  const listModel = createListModel({
    config: {
      dynamodb: {
        defaultTableName: 'tableName'
      }
    },
    attributeNameLookUp,
    listFromTable: () => ({
      Items: [
        {
          PartitionId: 'xxxx',
          SortKey: 'yyyy',
          IsActive: true
        },
        {
          PartitionId: 'xxxx',
          SortKey: 'yyyy-1',
          IsActive: true
        }
      ]
    }),
    castInto: identity
  })

  const list = await listModel({
    queryStringParameters: {}
  })
  t.snapshot(list)
})
