# Snapshot report for `lib/model/cast-to.spec.js`

The actual snapshot is saved in `cast-to.spec.js.snap`.

Generated by [AVA](https://avajs.dev).

## Check allowed model name

> Snapshot 1

    [
      'db:next',
      'model',
    ]

## Check conversion is consistent

> Snapshot 1

    {
      FirstProperty: 'NameFirst',
      IsActive: true,
      LastProperty: 'NameLast',
      PartitionId: 'user@email.com',
      SortKey: 'uuidInTimeStrong',
    }

> Snapshot 2

    {
      firstProperty: 'NameFirst',
      isActive: true,
      lastProperty: 'NameLast',
      partitionId: 'user@email.com',
      sortKey: 'uuidInTimeStrong',
    }