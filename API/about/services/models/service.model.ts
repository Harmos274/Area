import { WidgetModel } from './widget.model'

export class ServiceModel {
    constructor(name: string, widgets: Array<WidgetModel>) {
        this.name = name
        this.widgets = widgets
    }
    name: string
    widgets: Array<WidgetModel>
}
