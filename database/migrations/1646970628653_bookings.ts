import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('bookingStartDate').notNullable()
      table.date('bookingEndDate').notNullable()
      table.string('invoice').notNullable()
      table.json('itemId').notNullable()
      table.integer('total').notNullable()
      table.integer('memberId').unsigned().references('id').inTable('members')
      table.integer('bankId').unsigned().references('id').inTable('banks')
      table.json('payments').notNullable()
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
