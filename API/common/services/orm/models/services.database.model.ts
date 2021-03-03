import { AutoIncrement, Column, Model, PrimaryKey, Table, HasMany, DataType } from 'sequelize-typescript'

@Table({ tableName: 'services', timestamps: false })
export default class Service extends Model<Service> {
    @PrimaryKey
    @AutoIncrement
    @Column
    service_id!: number

    @Column
    token!: string

    @Column
    refresh_token!: string

    @Column
    enabled!: boolean

    @Column(DataType.DATE)
    token_expire_date?: Date
}
