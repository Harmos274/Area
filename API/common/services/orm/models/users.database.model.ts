import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
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

    @BelongsTo(() => Service, 'twitter_id')
    twitter?: Service

    @BelongsTo(() => Service, 'reddit_id')
    reddit?: Service

    @BelongsTo(() => Service, 'spotify_id')
    spotify?: Service

    @Column
    token?: string

    @Column(DataType.DATE)
    token_expire_date?: Date
}
