import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import ErrorModel from '../../common/models/error.model'
import Widget from '../../common/services/orm/models/widgets.database.model'
import WidgetService from '../services/widget.service'
import ListResponseModel from '../models/list.response.model'
import User from '../../common/services/orm/models/users.database.model'
import { Token } from 'oauth2-server'
import CreateRequestModel from '../models/create.request.model'
import CreateResponseModel from '../models/create.response.model'
import DeleteResponseModel from '../models/delete.response.model'
import ModifyRequestModel from '../models/modify.request.model'
import ModifyResponseModel from '../models/modify.response.model'

export function list(req: Request, res: Response<BaseModel, Record<string, Token>>): void {
    const user = res.locals.oauth.user as User

    res.status(200).send(new ListResponseModel(WidgetService.getWidget(user)))
}

type CreateRequest = Request<unknown, unknown, CreateRequestModel>
export async function createWidget(req: CreateRequest, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const created = await WidgetService.createWidget(user, req.body)

        res.status(201).send(new CreateResponseModel(created.id.toString()))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Internal error: ${e.toString()}`))
    }
}

type ModifyRequest = Request<unknown, unknown, ModifyRequestModel>
export async function modifyWidget(req: ModifyRequest, res: Response<BaseModel, Record<string, Widget>>): Promise<void> {
    try {
        const service = new WidgetService(res.locals.widget)

        await service.modifyWidget(req.body)
        res.status(200).send(new ModifyResponseModel())
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Internal error: ${e.toString()}`))
    }
}

export async function deleteWidget(req: Request, res: Response<BaseModel, Record<string, Widget>>): Promise<void> {
    try {
        const service = new WidgetService(res.locals.widget)

        await service.deleteWidget()
        res.status(200).send(new DeleteResponseModel())
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Internal error: ${e.toString()}`))
    }
}
