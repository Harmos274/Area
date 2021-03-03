import BaseModel from './base.model'

export default class StatusResponseModel extends BaseModel {
    constructor(logged_in: boolean) {
        super(true)
        this.data = { logged_in }
    }
    data: {
        logged_in: boolean
    }
}
