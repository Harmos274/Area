export default class WidgetErrorModel extends Error {
    constructor(message: string) {
        super(`Widget Service Error:${message}`)
    }
}
