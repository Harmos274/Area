import BaseModel from "./base.model"

export default class ErrorModel extends BaseModel {
    constructor(message: string) {
        super(false)
        this.data = {message}
    }

    data: { message: string }
}