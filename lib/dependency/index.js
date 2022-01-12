import { asValue, asFunction, createContainer } from 'awilix'
import config from '../../config'
import createS3Client from '../util/client/s3'
import createEventService from '../service/event-service'
import createDynamoClient, { createDynamoDocumentClient } from '../util/client/dynamodb'
import {
  createPutToS3,
  createGetFromS3,
  createListFromS3,
  createDeleteFromS3
} from '../service/s3'
import registerHttpClients from './register-http-client'
import createValidateJson from '../util/validate-json'
import createValidateModel from '../model/schema'

import { createGetConfigHandler } from '../core'

import {
  createCurrentEnv,
  createIsDev,
  createIsProd
} from './current-env-util'
import createConvertPlatformDataToModel from '../model/cast-to'
import createCreateModel from '../core/create'
import createGetModel from '../core/get'
import createUpdateModel from '../core/update'
import createListModel from '../core/list'
import attributeNameLookUp from '../model/map.json'
import {
  createGetFromTable,
  createListFromTable,
  createDeleteFromTable,
  createPutIntoTable,
  createUpdateTable
} from '../service/dynamodb'

const container = createContainer()
container.register('config', asValue(config))
container.register('attributeNameLookUp', asValue(attributeNameLookUp))
container.register('isProd', asFunction(createIsProd).scoped())
container.register('isDev', asFunction(createIsDev).scoped())
container.register('currentEnv', asFunction(createCurrentEnv).scoped())
container.register('s3Client', asFunction(createS3Client).scoped())
container.register('eventService', asFunction(createEventService).scoped())
container.register('dynamoClient', asFunction(createDynamoClient).scoped())
container.register('dynamoDocumentClient', asFunction(createDynamoDocumentClient).scoped())
container.register('getFromTable', asFunction(createGetFromTable).scoped())
container.register('putIntoTable', asFunction(createPutIntoTable).scoped())
container.register('updateTable', asFunction(createUpdateTable).scoped())
container.register('listFromTable', asFunction(createListFromTable).scoped())
container.register('deleteFromTable', asFunction(createDeleteFromTable).scoped())
container.register('putToS3', asFunction(createPutToS3).scoped())
container.register('getFromS3', asFunction(createGetFromS3).scoped())
container.register('listFromS3', asFunction(createListFromS3).scoped())
container.register('deleteFromS3', asFunction(createDeleteFromS3).scoped())
container.register('validateJson', asFunction(createValidateJson).scoped())
container.register('validateModel', asFunction(createValidateModel).scoped())
container.register('castInto', asFunction(createConvertPlatformDataToModel).scoped())
registerHttpClients({ container, config })

// A convinient way to register endpoints
container.register('getConfigRouterHandler', asFunction(createGetConfigHandler).scoped())
container.register('createModel', asFunction(createCreateModel).scoped())
container.register('getModel', asFunction(createGetModel).scoped())
container.register('updateModel', asFunction(createUpdateModel).scoped())
container.register('listModel', asFunction(createListModel).scoped())
export default () => container
