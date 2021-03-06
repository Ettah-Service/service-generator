# Snapshot report for `lib/core/list/index.spec.js`

The actual snapshot is saved in `index.spec.js.snap`.

Generated by [AVA](https://avajs.dev).

## Check convert to replacement context

> Snapshot 1

    {
      '{{firstProperty}}': 'FirstProperty',
      '{{partitionId}}': 'PartitionId',
      '{{sortKey}}': 'SortKey',
    }

## Check  compile template

> Snapshot 1

    {
      scanIndexForward: true,
      tableName: 'myTablename',
    }

## Check get query with query param 

> Snapshot 1

    {
      ExpressionAttributeValues: {
        ':hkey': 'key',
        ':rkey': 2015,
      },
      IndexName: 'PartitionId',
      KeyConditionExpression: 'PartitionId = :hkey and SortKey > :rkey',
      TableName: 'TableName',
    }

> Snapshot 2

    {
      ExpressionAttributeValues: {
        ':hkey': 'key',
        ':rkey': 2015,
      },
      IndexName: 'PartitionId',
      KeyConditionExpression: 'PartitionId = :hkey and SortKey > :rkey',
      TableName: 'TableName',
    }

## Check list models

> Snapshot 1

    {
      data: {
        items: [
          'db:next',
          'db:next',
        ],
      },
    }
