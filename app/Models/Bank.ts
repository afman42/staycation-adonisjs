import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bank extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'nameBank'})
  public nameBank: string
  
  @column({ columnName: 'nomorRekening'})
  public nomorRekening: string

  @column()
  public name: string

  @column({ columnName: 'imageUrl'})
  public imageUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
