# Snapshot report for `lib/model/schema.spec.js`

The actual snapshot is saved in `schema.spec.js.snap`.

Generated by [AVA](https://avajs.dev).

## Check model schema has not changed

> Snapshot 1

    {
      $id: 'model',
      additionalProperties: false,
      properties: {
        firstProperty: {
          type: 'string',
        },
        isActive: {
          default: true,
          type: 'boolean',
        },
        lastProperty: {
          type: 'string',
        },
        partitionId: {
          type: 'string',
        },
      },
      required: [
        'partitionId',
        'sortKey',
        'isActive',
      ],
      type: 'object',
    }
