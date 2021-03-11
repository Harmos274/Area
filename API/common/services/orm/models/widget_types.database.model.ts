import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import Widget from './widgets.database.model'

@Table({ tableName: 'widget_types', timestamps: false })
export default class WidgetType extends Model<WidgetType> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @Column
    type!: string

    @Column
    configurable!: boolean

    @HasMany(() => Widget, 'widget_type_id')
    widgets?: Array<Widget>
}
