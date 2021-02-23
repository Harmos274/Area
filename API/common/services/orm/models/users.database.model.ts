import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import Service from './services.database.model'

@Table({ tableName: 'users', timestamps: false })
export default class User extends Model<User> {
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

    @ForeignKey(() => Service)
    @Column
    twitter?: number

    @ForeignKey(() => Service)
    @Column
    reddit?: number

    @ForeignKey(() => Service)
    @Column
    spotify?: number

    @Column
    token?: string

    @Column
    token_expire_date?: Date
}
