import BaseAboutResponseModel from './base.about.response.model'
import { ServiceModel } from '../services/models/service.model'
import { WidgetModel } from '../services/models/widget.model'

const authService = [new ServiceModel('/oauth', [new WidgetModel('login'), new WidgetModel('register')])]

export default class UnauthedAboutResponseModel extends BaseAboutResponseModel {
    authenticated = false

    constructor(url: string) {
        super(authService, url)
    }
}
