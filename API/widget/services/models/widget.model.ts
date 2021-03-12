export default class WidgetModel {
    constructor(id: number, type: { name: string; configurable: boolean }, config: { name: string; number: number; refresh: number }) {
        this.id = id
        this.type = type
        this.config = config
    }
    id: number
    type: {
        name: string
        configurable: boolean
    }
    config: {
        name: string
        number: number
        refresh: number
    }
}
