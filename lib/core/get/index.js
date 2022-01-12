import runHooks from './hook'

export const getQuery = (tableName, partitionId, sortKey) => ({
  TableName: tableName,
  Key: { PartitionId: partitionId, SortKey: sortKey }
})
export default ({
  config: {
    dynamodb: {
      defaultTableName: tableName
    }
  },
  getFromTable,
  castInto
}) => async ({ pathParameters: { partitionId, sortKey } }) => {
  const params = getQuery(tableName, partitionId, sortKey)
  const { Item: nextDatabaseModel } = await getFromTable(params)
  const newModel = castInto('db:next', 'model', nextDatabaseModel)
  const result = await runHooks({ input: { partitionId, sortKey }, model: newModel })
  return { data: { model: newModel, hooks: result } }
}
