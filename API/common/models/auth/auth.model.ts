import BaseModel from "../base.model"

export default class AuthModel extends BaseModel {
    constructor(token: string) {
        super(true)
        this.data = {token}
    }
    data: {token: string}
}