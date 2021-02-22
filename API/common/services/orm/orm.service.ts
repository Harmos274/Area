import Config from '../../config/env.config'
import { Sequelize } from 'sequelize-typescript'

export const Orm = new Sequelize({
    dialect: 'postgres',
    host: Config.database.host,
    port: Number(Config.database.port),
    database: Config.database.name,
    username: Config.database.user,
    password: Config.database.password,
    models: [`${__dirname}/models`],
})
