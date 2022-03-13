import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import Bank from './Bank'
import Item from './Item'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'bookingStartDate' })
  public bookingStartDate: Date

  @column({ columnName: 'bookingEndDate' })
  public bookingEndDate: Date

  @column()
  public invoice: string

  @column({ columnName: 'itemId' })
  public itemId: string

  @column()
  public total: number

  @column()
  public payments: string

  @column({ columnName: 'memberId' })
  public memberId: number

  @column({ columnName: 'bankId' })
  public bankId: number

  @belongsTo(() => Member)
  public member: BelongsTo<typeof Member>

  @computed()
  public get itemIdJSON() {
    return JSON.parse(this.itemId)
  }

  @computed()
  public get paymentsJSON() {
    return JSON.parse(this.payments)
  }

  @belongsTo(() => Bank)
  public bank: BelongsTo<typeof Bank>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
