import * as OAuth2Server from 'oauth2-server'
import OAuth2Model from './models/oauth2.model'

const options: OAuth2Server.ServerOptions = {
    model: OAuth2Model,
    accessTokenLifetime: 2628000, // 1 Month
    allowBearerTokensInQueryString: true,
    requireClientAuthentication: { password: false },
}

const Oauth2Service = new OAuth2Server(options)

export default Oauth2Service
