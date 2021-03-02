import User from '../orm/models/users.database.model'
import { createHash } from 'crypto'
import { ValidationError } from 'sequelize'
import DatabaseError from './models/database.error.model'
import Service from '../orm/models/services.database.model'

export default class DatabaseService {
    private static crypt(source: string): string {
        return createHash('sha256').update(source).digest('hex')
    }

    static async createUser(mail: string, username: string, password: string): Promise<User> {
        try {
            return await User.create({ name: username, mail: mail, password: this.crypt(password) })
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                throw new DatabaseError("Can't write on database")
            }
            throw new DatabaseError(`Unknown error : ${e.toString()}`)
        }
    }

    static async getUserFromCredentials(mail: string, password: string): Promise<User> {
        const user = await User.findOne({ where: { mail: mail, password: this.crypt(password) } })

        if (!user) {
            throw new DatabaseError("Can't find user")
        }
        return user
    }

    static async getUserFromAccessToken(token: string): Promise<User> {
        const user = await User.findOne({ where: { token: token }, include: [{ all: true }] })

        if (!user) {
            throw new DatabaseError("Can't find user")
        }
        return user
    }

    static async saveServiceAccessToken(
        serviceName: 'reddit' | 'spotify' | 'twitter',
        user: User,
        serviceToken: string,
        serviceRefreshToken: string,
        serviceTokenExpireDate: Date
    ): Promise<User> {
        try {
            if (!user[serviceName]) {
                const service = await Service.create({
                    token: serviceToken,
                    refresh_token: serviceRefreshToken,
                    token_expire_date: serviceTokenExpireDate,
                    enabled: true,
                })
                await user.$set('reddit', service.service_id)
            } else {
                user[serviceName].token = serviceToken
                user[serviceName].refresh_token = serviceRefreshToken
                user[serviceName].token_expire_date = serviceTokenExpireDate
                user[serviceName].enabled = true
                await user[serviceName].save()
            }
            await user.save()
            return user
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                throw new DatabaseError("Can't write on database")
            }
            throw new DatabaseError(`Unknown error : ${e.toString()}`)
        }
    }

    static async saveAccessToken(token: string, expiration: Date, userId: number): Promise<string> {
        const user = await User.findOne({ where: { id: userId } })

        if (!user) {
            throw new DatabaseError("Can't find user")
        }
        try {
            user.token = token
            user.token_expire_date = expiration
            await user.save()
            return token
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                throw new DatabaseError("Can't write on database")
            }
            throw new DatabaseError(`Unknown error : ${e.toString()}`)
        }
    }

    static async disableService(serviceName: 'reddit' | 'spotify' | 'twitter', user: User): Promise<void> {
        try {
            user[serviceName].enabled = false
            await user[serviceName].save()
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                throw new DatabaseError("Can't write on database")
            }
            throw new DatabaseError(`Unknown error : ${e.toString()}`)
        }
    }
}
