import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import Services from './services.database.model'

@Table({ tableName: 'users', timestamps: false })
export default class Users extends Model<Services> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @Column
    name!: string

    @Column
    mail!: string

    @Column
    password!: string

    @ForeignKey(() => Services)
    @Column
    twitter?: number

    @ForeignKey(() => Services)
    @Column
    reddit?: number

    @ForeignKey(() => Services)
    @Column
    spotify?: number

    @Column
    token?: string

    @Column
    token_expire_date?: Date
}
