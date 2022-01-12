import AJV from 'ajv'
import { toJson } from '@meltwater/phi'

export default () => ({ schema, data }) => {
  const schemaManager = new AJV({
    allErrors: true,
    useDefaults: true,
    validateSchema: true
  })
  const validate = schemaManager.compile(schema)
  const isValid = validate(data)
  if (isValid) return data
  throw new Error(`Validation : ${toJson(validate.errors)}`)
}
