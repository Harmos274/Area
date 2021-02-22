export default class DatabaseError extends Error {
    constructor(message: string) {
        super(`Database Service Error: ${message}`)
    }
}
