import validBearerToken from '../common/middlewares/token.validation.middleware'
import { Application } from 'express'
import { list, createWidget, modifyWidget, deleteWidget } from './controllers/widget.controller'
import validWidgetId from './middlewares/widget_id.validation.middleware'
import hasWidgetIdValidField from './middlewares/verify.widget_id.middleware'
import hasCreateWidgetValidField from './middlewares/verify.create.middleware'
import validTypeName from './middlewares/type_name.validation.middleware'
import hasValidModifyField from './middlewares/verify.modify.middleware'

const baseUrl = '/widget'

export default function WidgetRouter(app: Application): void {
    app.get(`${baseUrl}/list`, [validBearerToken, list])
    app.post(`${baseUrl}`, [validBearerToken, hasCreateWidgetValidField, validTypeName, createWidget])
    app.patch(`${baseUrl}/:widget_id`, [validBearerToken, hasWidgetIdValidField, validWidgetId, hasValidModifyField, modifyWidget])
    app.delete(`${baseUrl}/:widget_id`, [validBearerToken, hasWidgetIdValidField, validWidgetId, deleteWidget])
}
