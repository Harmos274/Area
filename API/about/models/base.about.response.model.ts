import { ServiceModel } from '../services/models/service.model'

export default abstract class BaseAboutResponseModel {
    protected constructor(services: Array<ServiceModel>, url: string) {
        this.url = url
        this.services = services
    }
    url: string
    services: Array<ServiceModel>
}
