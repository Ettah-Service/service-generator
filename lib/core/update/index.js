import {
  length,
  propEq,
  compose,
  prop,
  find
} from '@meltwater/phi'
import { map as mapAwait } from 'awaiting'
import runHooks from './hook'
import createLogger from '../../util/logger'

export const getQuery = ({
  attributeNameLookUp,
  tableName,
  partitionId,
  sortKey,
  patch: { fieldName, replace, remove }
}) => {
  const dbNextFieldName = compose(
    prop('db:next'),
    find(propEq('model', fieldName))
  )(attributeNameLookUp)
  return ({
    TableName: tableName,
    Key: { PartitionId: partitionId, SortKey: sortKey },
    UpdateExpression: remove ? 'REMOVE #key' : 'SET #key = :value',
    ExpressionAttributeNames: { '#key': dbNextFieldName },
    ...(remove ? {} : { ExpressionAttributeValues: { ':value': replace } })
  })
}
export default ({
  config: {
    dynamodb: {
      defaultTableName: tableName
    }
  },
  attributeNameLookUp,
  updateTable
}) => async ({ pathParameters: { partitionId, sortKey }, body = [] }) => {
  const log = createLogger('core:update')
  log('Items', length(body))
  let statusCode
  const result = await mapAwait(body, length(body), async patch => {
    try {
      const params = getQuery({
        attributeNameLookUp,
        tableName,
        partitionId,
        sortKey,
        patch
      })
      await updateTable(params)
      await runHooks({ partitionId, sortKey, patch })
      return { ...patch, status: true, params }
    } catch (error) {
      log(error)
      statusCode = 400
      return { ...patch, status: false, message: prop('message', error) }
    }
  })
  log(result)
  return { data: { result }, statusCode }
}
