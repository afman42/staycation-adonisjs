import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column({ columnName: 'imageUrl'})
  public imageUrl: string

  @column({ columnName: 'isPopular'})
  public isPopular?: boolean

  @column({ columnName: 'itemId'})
  public itemId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
