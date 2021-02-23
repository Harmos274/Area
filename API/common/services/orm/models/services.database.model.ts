import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'

@Table({ tableName: 'services', timestamps: false })
export default abstract class Service extends Model<Service> {
    @PrimaryKey
    @Unique
    @Column
    service_id!: number

    @Column
    token!: string

    @Column
    refresh_token!: string

    @Column
    enabled!: boolean
}
