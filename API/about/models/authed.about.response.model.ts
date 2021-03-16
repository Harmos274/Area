import BaseAboutResponseModel from './base.about.response.model'
import { ServiceModel } from '../services/models/service.model'
import { WidgetModel } from '../services/models/widget.model'

const authService = [new ServiceModel('/oauth', [new WidgetModel('login'), new WidgetModel('register')])]

export default class AuthedAboutResponseModel extends BaseAboutResponseModel {
    authenticated = true

    constructor(url: string, services: Array<ServiceModel>) {
        super(authService.concat(services), url)
    }
}
