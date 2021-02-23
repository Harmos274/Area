import BaseModel from './base.model'

export default class ErrorModel extends BaseModel {
    constructor(source: string, message: string) {
        super(false)
        this.data = { source, message }
    }

    data: {
        source: string
        message: string
    }
}
