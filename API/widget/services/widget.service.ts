import Widget from '../../common/services/orm/models/widgets.database.model'
import User from '../../common/services/orm/models/users.database.model'
import WidgetModel from './models/widget.model'
import WidgetType from '../../common/services/orm/models/widget_types.database.model'
import CreateRequestModel from '../models/create.request.model'
import WidgetErrorModel from './models/widget.error.model'
import ModifyRequestModel from '../models/modify.request.model'

export default class WidgetService {
    constructor(widget: Widget) {
        this.widget = widget
    }

    widget: Widget

    static getWidget(user: User): Array<WidgetModel> {
        return user.widgets.map(
            (widget) =>
                new WidgetModel(
                    widget.id,
                    { name: widget.widget_type.type, configurable: widget.widget_type.configurable },
                    { name: widget.name, number: widget.number, refresh: widget.refresh }
                )
        )
    }

    static async isValidTypeName(typeName: string): Promise<boolean> {
        const valid = await WidgetType.findOne({ where: { type: typeName } })
        return !!valid
    }

    static async createWidget(user: User, widgetDescription: CreateRequestModel): Promise<Widget> {
        try {
            const widget_type = await WidgetType.findOne({ where: { type: widgetDescription.type_name } })
            return Widget.create({
                user_id: user.id,
                widget_type_id: widget_type.id,
                name: widgetDescription.config?.name || null,
                number: widgetDescription.config?.number || null,
                refresh: widgetDescription.config?.refresh || null,
            })
        } catch (e: unknown) {
            throw new WidgetErrorModel(e.toString())
        }
    }

    public async deleteWidget(): Promise<void> {
        try {
            await Widget.destroy({ where: { id: this.widget.id } })
        } catch (e: unknown) {
            throw new WidgetErrorModel(e.toString())
        }
    }

    public async modifyWidget(newConfig: ModifyRequestModel): Promise<void> {
        try {
            this.widget.number = newConfig?.config.number || null
            this.widget.name = newConfig?.config.name || null
            this.widget.refresh = newConfig?.config.refresh || null
            await this.widget.save()
        } catch (e: unknown) {
            throw new WidgetErrorModel(e.toString())
        }
    }
}
