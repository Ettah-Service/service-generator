# Snapshot report for `lib/core/update/index.spec.js`

The actual snapshot is saved in `index.spec.js.snap`.

Generated by [AVA](https://avajs.dev).

## Check get model query

> Snapshot 1

    {
      ExpressionAttributeNames: {
        '#key': 'FirstProperty',
      },
      Key: {
        PartitionId: 'xxx',
        SortKey: 'yyyy',
      },
      TableName: 'tableName',
      UpdateExpression: 'REMOVE #key',
    }

> Snapshot 2

    {
      ExpressionAttributeNames: {
        '#key': 'FirstProperty',
      },
      ExpressionAttributeValues: {
        ':value': 'firstNameProperty',
      },
      Key: {
        PartitionId: 'xxx',
        SortKey: 'yyyy',
      },
      TableName: 'tableName',
      UpdateExpression: 'SET #key = :value',
    }
