import { when, is, fromJson, compose } from '@meltwater/phi'
import runHooks from './hook'

const convertStringToJson = when(is(String), fromJson)
export const getQuery = (tableName, model) => ({
  TableName: tableName,
  ReturnConsumedCapacity: 'TOTAL',
  Item: model
})
export default ({
  config: {
    dynamodb: {
      defaultTableName: tableName
    }
  },
  putIntoTable,
  castInto
}) => async ({ body = {} }) => {
  const input = convertStringToJson(body)
  const getNextDatabaseModel = compose(
    castInto('model', 'db:next'),
    castInto('db:next', 'model'),
    castInto('model', 'db:next')
  )
  const nextDatabaseModel = getNextDatabaseModel(input)
  await putIntoTable(getQuery(tableName, nextDatabaseModel))
  const newModel = castInto('db:next', 'model', nextDatabaseModel)
  const result = await runHooks({ input, model: newModel })
  return { data: { model: newModel, hooks: result } }
}
