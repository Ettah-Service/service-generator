import { getNanoseconds } from './get-nano-time'

export const getSchema = (getSortKey = getNanoseconds) => ({
  $id: 'model',
  type: 'object',
  properties: {
    partitionId: { type: 'string' },
    sortKey: { type: 'string', default: getSortKey() },
    firstProperty: { type: 'string' },
    lastProperty: { type: 'string' },
    isActive: { type: 'boolean', default: true }
  },
  required: [
    'partitionId',
    'sortKey',
    'isActive'
  ],
  additionalProperties: false
})

export default ({
  validateJson
}) => data => validateJson({ schema: getSchema(), data })
