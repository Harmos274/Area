export default class Config {
    static port = 5000
    static version = process.env.AREA_VERSION
    static database = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}
