import { map as mapAwait } from 'awaiting'
import {
  assoc,
  compose,
  isNotNilOrEmpty,
  length,
  match,
  reduce,
  replace,
  when,
  fromJson,
  always,
  defaultTo
} from '@meltwater/phi'
import runHooks from './hook'
import {
  toAscii
} from '../../util/base64'

export const convertToReplacementContext = reduce((acc, { model, 'db:next': dbNext }) => assoc(`{{${model}}}`, dbNext, acc), {})

export const compileQueryTemplate = (context, template) => {
  const compile = compose(
    fromJson,
    reduce(
      (acc, placeholder) => replace(
        new RegExp(placeholder, 'g'),
        context[placeholder],
        acc
      ),
      template
    ),
    match(/\{\{([^}]+)\}\}/g)
  )
  return compile(template)
}

export const getQuery = ({
  tableName,
  attributeNameLookUp,
  queryStringParameters
}) => {
  const { query, isBase64Encoded = true } = queryStringParameters
  const getTemplate = when(always(isBase64Encoded), () => toAscii(query))

  return isNotNilOrEmpty(query)
    ? (() => {
        const template = getTemplate(query)
        const context = convertToReplacementContext(attributeNameLookUp)
        const compiledTemplate = compileQueryTemplate(context, template)
        return compiledTemplate
      })()
    : { TableName: tableName }
}

export default ({
  config: {
    dynamodb: {
      defaultTableName: tableName
    }
  },
  attributeNameLookUp,
  listFromTable,
  castInto
}) => async input => {
  const { queryStringParameters } = input
  const params = getQuery({
    tableName,
    attributeNameLookUp,
    queryStringParameters: defaultTo({}, queryStringParameters)
  })
  const { Items: items } = await listFromTable(params, false)
  const models = await mapAwait(items, length(items), async item => {
    const newModel = castInto('db:next', 'model', item)
    await runHooks({ input: queryStringParameters, model: newModel })
    return newModel
  }, items)
  return { data: { items: models } }
}
