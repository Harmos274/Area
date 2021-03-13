import BaseModel from '../../common/models/base.model'

export default class PlayerResponseModel extends BaseModel {
    constructor(url: string) {
        super(true)
        this.data = { url }
    }
    data: { url: string }
}
