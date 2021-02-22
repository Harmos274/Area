import Users from '../orm/models/users.database.model'
import { createHash } from 'crypto'
import DatabaseError from './models/database.error.model'

export default class DatabaseService {
    private static crypt(source: string): string {
        return createHash('sha256').update(source).digest('hex')
    }

    static async createUser(mail: string, username: string, password: string): Promise<Users> {
        try {
            return await Users.create({ name: username, mail: mail, password: this.crypt(password) })
        } catch {
            throw new DatabaseError("Can't create user")
        }
    }
    static async getUserFromCredentials(mail: string, password: string): Promise<Users> {
        try {
            return await Users.findOne({ where: { mail: mail, password: this.crypt(password) } })
        } catch {
            throw new DatabaseError("Can't find user")
        }
    }

    static async getUserFromAccessToken(token: string): Promise<Users> {
        try {
            return await Users.findOne({ where: { token: token } })
        } catch {
            throw new DatabaseError("Can't find user")
        }
    }

    static async saveAccessToken(token: string, expiration: Date, userId: number): Promise<string> {
        try {
            const user = await Users.findOne({ where: { id: userId } })

            if (user) {
                user.token = token
                user.token_expire_date = expiration
                await user.save()
                return token
            }
        } catch {
            throw new DatabaseError("Can't write to database")
        }
    }
}
