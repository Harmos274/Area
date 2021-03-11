import { BelongsTo, AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'
import User from './users.database.model'
import WidgetType from './widget_types.database.model'

@Table({ tableName: 'widgets', timestamps: false })
export default class Widget extends Model<Widget> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @BelongsTo(() => User, 'user_id')
    user!: User

    @BelongsTo(() => WidgetType, 'widget_type_id')
    widget_type: WidgetType

    @Column
    name?: string

    @Column
    number?: number

    @Column
    refresh?: number
}
