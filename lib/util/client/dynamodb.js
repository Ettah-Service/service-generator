import { DynamoDB } from 'aws-sdk'

export default ({
  config: {
    dynamodb: {
      auth: { endpoint, accessKeyId, secretAccessKey, region }
    }
  }
}) => new DynamoDB({ endpoint, accessKeyId, secretAccessKey, region })

export const createDynamoDocumentClient = ({
  config: {
    dynamodb: {
      auth: { endpoint, accessKeyId, secretAccessKey, region }
    }
  }
}) => new DynamoDB.DocumentClient({ endpoint, accessKeyId, secretAccessKey, region })
