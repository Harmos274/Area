import User from '../orm/models/users.database.model'
import { createHash } from 'crypto'
import { ValidationError } from 'sequelize'
import DatabaseError from './models/database.error.model'
import Service from '../orm/models/services.database.model'

export type ServiceType = 'reddit' | 'spotify' | 'github'

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
        const user = await User.findOne({
            where: { token: token },
            // sequelize-typescript don't support "nested" option on include
            // by forcing my type on "include" i directly use sequelize API specification for common JS
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            include: [{ all: true, nested: true }],
        })

        if (!user) {
            throw new DatabaseError("Can't find user")
        }
        return user
    }

    static async saveServiceAccessToken(
        serviceType: ServiceType,
        user: User,
        serviceToken: string,
        serviceRefreshToken: string,
        serviceTokenExpireDate: Date
    ): Promise<User> {
        try {
            if (!user[serviceType]) {
                const service = await Service.create({
                    token: serviceToken,
                    refresh_token: serviceRefreshToken,
                    token_expire_date: serviceTokenExpireDate,
                    enabled: true,
                })
                await user.$set(serviceType, service.service_id)
            } else {
                user[serviceType].token = serviceToken
                user[serviceType].refresh_token = serviceRefreshToken
                user[serviceType].token_expire_date = serviceTokenExpireDate
                user[serviceType].enabled = true
                await user[serviceType].save()
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

    static async disableService(serviceType: ServiceType, user: User): Promise<void> {
        try {
            if (user[serviceType]) {
                user[serviceType].enabled = false
                await user[serviceType].save()
            }
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                throw new DatabaseError("Can't write on database")
            }
            throw new DatabaseError(`Unknown error : ${e.toString()}`)
        }
    }
}
