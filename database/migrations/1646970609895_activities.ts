import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Activities extends BaseSchema {
  protected tableName = 'activities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('imageUrl').notNullable()
      table.boolean('isPopular').nullable()
      table.integer('itemId').unsigned().references('id').inTable('items')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
