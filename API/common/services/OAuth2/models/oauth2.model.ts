import DatabaseService from '../../database/database.service'
import { AuthorizationCodeModel, ClientCredentialsModel, PasswordModel, Client, User, Token, Falsey } from 'oauth2-server'

type Oauth2Model = AuthorizationCodeModel | ClientCredentialsModel | PasswordModel

const model: Oauth2Model = {
    verifyScope: verifyScope,
    getClient: getClient,
    saveToken: saveToken,
    getUser: getUser,
    getAccessToken: getAccessToken,
}
export default model

function getClient(clientID: string, clientSecret: string): Promise<Client> {
    const client: Client = {
        clientID,
        clientSecret,
        grants: ['password'],
        redirectUris: null,
        id: clientID,
    }
    // there isn't any Areaplication ftm
    return new Promise<Client>((resolve) => {
        resolve(client)
    })
}

function verifyScope(token: Token, scope: string | string[]): Promise<boolean> {
    return new Promise<boolean>((resolve) => resolve(true))
}

async function saveToken(accessToken: Token, client: Client, user: User): Promise<Token | Falsey> {
    try {
        await DatabaseService.saveAccessToken(accessToken.accessToken, accessToken.accessTokenExpiresAt, user.id)
        accessToken.client = client
        accessToken.user = user
        return accessToken
    } catch {
        return false
    }
}

async function getUser(username: string, password: string): Promise<User | Falsey> {
    try {
        return await DatabaseService.getUserFromCredentials(username, password)
    } catch {
        return false
    }
}

async function getAccessToken(accessToken: string): Promise<Token | Falsey> {
    try {
        const user = await DatabaseService.getUserFromAccessToken(accessToken)

        return {
            client: { id: user.id.toString(), grants: ['password'] },
            user: user,
            accessToken: accessToken,
        }
    } catch {
        return false
    }
}
