import BaseModel from '../../common/models/base.model'

export default class CreateResponseModel extends BaseModel {
    constructor(widgetId: string) {
        super(true)
        this.data = { widget_id: widgetId }
    }
    data: { widget_id: string }
}
