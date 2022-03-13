import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Items extends BaseSchema {
  protected tableName = 'items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.integer('price').notNullable()
      table.string('country').defaultTo('Indonesia')
      table.string('city').notNullable()
      table.boolean('isPopular').nullable()
      table.text('description').notNullable()
      table.string('unit').defaultTo('night')
      table.integer('sumBooking').notNullable()
      table.integer('categoryId').unsigned().references('id').inTable('categories')
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
