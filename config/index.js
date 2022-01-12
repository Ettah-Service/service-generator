import { defaultTo, equals } from '@meltwater/phi'

const defaultRegion = 'us-east-1'
export default {
  env: process.env.ENV,
  debug: process.env.DEBUG,
  domain: process.env.DOMAIN,
  endpoint: process.env.ENDPOINT,
  routeKey: process.env.ROUTE_KEY,
  apiKey: process.env.API_KEY,
  dynamodb: {
    auth: {
      endpoint: process.env.DYNAMODB_AUTH_ENDPOINT,
      accessKeyId: process.env.DYNAMODB_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.DYNAMODB_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion)(process.env.DYNAMODB_AUTH_REGION)
    },
    defaultTableName: process.env.DYNAMODB_DEFAULT_TABLE_NAME
  },
  s3: {
    auth: {
      endpoint: process.env.S3_AUTH_ENDPOINT,
      accessKeyId: process.env.S3_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion)(process.env.S3_AUTH_REGION)
    },
    s3ForcePathStyle: equals('true', process.env.S3_FORCE_PATH_STYLE),
    bucket: process.env.S3_BUCKET_NAME
  },
  httpClients: {
    bareHttp: {},
    eventService: {
      baseURL: process.env.EVENT_SERVICE_ENDPOINT,
      responseType: 'json',
      retries: 3,
      headers: {
        'x-api-key': process.env.API_KEY
      }
    }
  }
}
