import Config from './common/config/env.config'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import AuthenticationRouter from './auth/routes.config'
import RedditRouter from './reddit/routes.config'
import WidgetRouter from './widget/routes.config'
import { Orm as orm } from './common/services/orm/orm.service'
import AboutRouter from './about/route.config'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Add api endpoint
AuthenticationRouter(app)
RedditRouter(app)
WidgetRouter(app)
AboutRouter(app)

// Cors config
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    } else {
        return next()
    }
})

orm.authenticate()
    .then(() => {
        console.log('connected to orm')
    })
    .catch(() => {
        throw new Error("Can't reach database")
    })
app.listen(Config.port, function () {
    console.log(`API listening at port ${Config.port}`)
})
