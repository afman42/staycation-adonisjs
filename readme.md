```
  itemId: {
    _id: {
      type: ObjectId,
      ref: 'Item',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },

```

```
  payments: {
    proofPayment: {
      type: String,
      required: true
    },
    bankFrom: {
      type: String,
      required: true
    },
    accountHolder: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Proses'
    }
  }
```

## Asset File
https://docs.adonisjs.com/guides/static-assets#url-conflicts

## Image Not Found
Please fill image in folder `public/admin/images/` same in the database

From CodeAtHome : https://github.com/codeathome-dev/bwa_server_staycation
Just Rewrite For learning Purpose