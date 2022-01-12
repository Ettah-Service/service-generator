import {
  reduce,
  compose,
  prop,
  path,
  assocPath,
  filter,
  propNotEq,
  split,
  allPass,
  map,
  includes,
  __,
  when,
  not,
  equals,
  curry
} from '@meltwater/phi'

const tp = split('.')

export const allowedModelNames = ['db:next', 'model']
const validateModelName = when(
  compose(not, includes(__, allowedModelNames)),
  modelName => { throw new Error(`${modelName} is not a valid modelName`) }
)

export default ({ attributeNameLookUp, validateModel }) => curry((fromModelName, toModelName, data) => {
  const payload = reduce(
    (acc, mp) => {
      map(validateModelName, [fromModelName, toModelName])
      const toPath = prop(toModelName, mp)
      const getValuePath = compose(tp, prop(fromModelName))
      const value = path(getValuePath(mp), data)
      return assocPath(tp(toPath), value, acc)
    },
    {},
    filter(allPass([propNotEq(fromModelName, null), propNotEq(toModelName, null)]), attributeNameLookUp)
  )

  const getDestinationObject = when(() => equals('model', toModelName), validateModel)
  return getDestinationObject(payload)
})
