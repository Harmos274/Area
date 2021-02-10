import { Pool, PoolClient, QueryResult } from 'pg'
import Config from '../../config/env.config'
import IDbService from './db.service.interface'

const pgPool = new Pool({
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,

    host: Config.database.host,
    port: Number(Config.database.port),
    database: Config.database.name,
    user: Config.database.user,
    password: Config.database.password,
})

export default class DbService implements IDbService {
    static query<T>(text: string, params: Array<string>, callback: (err: Error, result: QueryResult<T>) => void): void {
        return pgPool.query(text, params, callback)
    }

    static connect(): Promise<PoolClient> {
        return pgPool.connect()
    }
}
