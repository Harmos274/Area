import User from '../../common/services/orm/models/users.database.model'
import { ServiceModel } from './models/service.model'
import { ServiceType } from '../../common/services/database/database.service'
import { WidgetModel } from './models/widget.model'

const availableServices: Array<ServiceType> = ['reddit']

export default class AboutServices {
    constructor(user: User) {
        this.user = user
    }

    user: User

    public getServices(): Array<ServiceModel> {
        const services: Array<ServiceModel> = []

        for (const service of availableServices) {
            if (this.user[service] && this.user[service].enabled) {
                const widgets = this.user.widgets
                    .filter((widget) => widget.widget_type.type.startsWith(service))
                    .map((widget) => new WidgetModel(widget.widget_type.type))
                const newService = new ServiceModel(`/${service}`, widgets)

                services.push(newService)
            }
        }
        return services
    }
}
