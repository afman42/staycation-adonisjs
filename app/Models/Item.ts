import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Image from './Image'
import Feature from './Feature'
import Activity from './Activity'
import Category from './Category'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public price: number

  @column()
  public city: string

  @column()
  public country: string

  @column({ columnName: 'isPopular' })
  public isPopular: boolean

  @column()
  public description: string

  @column()
  public unit: string

  @column({ columnName: 'sumBooking' })
  public sumBooking: number

  @column({ columnName: 'categoryId' })
  public categoryId: number

  @hasMany(() => Image, {
    foreignKey: 'itemId'
  })
  public images: HasMany<typeof Image>

  @hasMany(() => Feature)
  public features: HasMany<typeof Feature>

  @belongsTo(() => Category)
  public categorya: BelongsTo<typeof Category>
  

  @hasMany(() => Activity)
  public activities: HasMany<typeof Activity>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
