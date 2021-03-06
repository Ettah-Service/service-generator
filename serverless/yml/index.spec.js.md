# Snapshot report for `serverless/yml/index.spec.js`

The actual snapshot is saved in `index.spec.js.snap`.

Generated by [AVA](https://avajs.dev).

## Check serverless.yml has not changed

> Snapshot 1

    `  config:␊
        handler: router.endpointRoute␊
        environment:␊
          ROUTE_KEY: getConfigRouterHandler␊
        events:␊
          - http:␊
              path: /service/config␊
              method: get␊
              cors: true␊
              private: true␊
    ␊
      create:␊
        handler: router.endpointRoute␊
        environment:␊
          ROUTE_KEY: createModel␊
        events:␊
          - http:␊
              path: /␊
              method: post␊
              cors: true␊
              private: true␊
    ␊
      get:␊
        handler: router.endpointRoute␊
        environment:␊
          ROUTE_KEY: getModel␊
        events:␊
          - http:␊
              path: /{partitionId}/{sortKey}␊
              method: get␊
              cors: true␊
              private: true␊
      update:␊
        handler: router.endpointRoute␊
        environment:␊
          ROUTE_KEY: updateModel␊
        events:␊
          - http:␊
              path: /{partitionId}/{sortKey}␊
              method: post␊
              cors: true␊
              private: true␊
      list:␊
        handler: router.endpointRoute␊
        environment:␊
          ROUTE_KEY: listModel␊
        events:␊
          - http:␊
              path: /␊
              method: get␊
              cors: true␊
              private: true␊
    `

> Snapshot 2

    `  environment:␊
        ENV: ${ssm:/alfa/users/mkn-service/production/env~true}␊
        DEBUG: ${ssm:/alfa/users/mkn-service/production/debug~true}␊
        DOMAIN: ${ssm:/alfa/users/mkn-service/production/domain~true}␊
        ENDPOINT: ${ssm:/alfa/users/mkn-service/production/endpoint~true}␊
        API_KEY: ${ssm:/alfa/users/api-service/authentication-key~true}␊
    functions:␊
    `

> Snapshot 3

    `service:␊
      name: mkn-service␊
    ␊
    plugins:␊
      - serverless-deployment-bucket␊
      - serverless-webpack␊
      - serverless-dotenv-plugin␊
      - serverless-offline␊
      - serverless-add-api-key␊
    ␊
    custom:␊
      tagName: ${self:service.name}-${env.CI_BRANCH, opt:stage, 'dev'}␊
      apiKeys:␊
        - name: service-api-authentication-key␊
          value: ${ssm:/alfa/users/api-service/authentication-key~true}␊
      longRunningFxnTimeout: 300␊
      apiGatewayFxnTimeout: 29␊
      logRetentionInDays: 5␊
      maxPreviousDeploymentArtifacts: 2␊
    ␊
    provider:␊
      name: aws␊
      runtime: nodejs12.x␊
      stage: ${opt:stage, 'dev'}␊
      region: ${opt:region, 'us-east-1'}␊
      stackName: ${self:custom.tagName}␊
      apiName: ${self:custom.tagName}␊
      deploymentBucket:␊
        name: com.alfa.users.tech.${self:provider.region}.deploys␊
        maxPreviousDeploymentArtifacts: ${self:custom.maxPreviousDeploymentArtifacts}␊
        blockPublicAccess: true␊
        serverSideEncryption: AES256␊
        tags:␊
          serviceName: ${self:service.name}␊
          feature: ${self:custom.tagName}␊
      logRetentionInDays: ${self:custom.logRetentionInDays}␊
      timeout: ${self:custom.apiGatewayFxnTimeout}␊
    `

> Snapshot 4

    `  # note no env need in yml for local env␊
    functions:␊
    `

> Snapshot 5

    ''
