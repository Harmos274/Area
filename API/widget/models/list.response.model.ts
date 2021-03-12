import BaseModel from '../../common/models/base.model'
import WidgetModel from '../services/models/widget.model'

export default class ListResponseModel extends BaseModel {
    constructor(widgets: Array<WidgetModel>) {
        super(true)
        this.data = widgets
    }
    data: Array<WidgetModel>
}
