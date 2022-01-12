// shield the service when storage layers change
export const createGetFromTable = ({
  dynamoDocumentClient
}) => async params => dynamoDocumentClient.get(params).promise()

export const createPutIntoTable = ({
  dynamoDocumentClient
}) => async params => dynamoDocumentClient.put(params).promise()

export const createUpdateTable = ({
  dynamoDocumentClient
}) => async params => dynamoDocumentClient.update(params).promise()

export const createListFromTable = ({
  dynamoDocumentClient
}) => async (params, isQuery = true) => dynamoDocumentClient[isQuery ? 'query' : 'scan'](params).promise()

export const createDeleteFromTable = ({
  dynamoDocumentClient
}) => async params => dynamoDocumentClient.delete(params).promise()
