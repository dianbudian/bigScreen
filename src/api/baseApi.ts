
import { BaseInputModel, BaseDeleteModel, BaseInfoModel, BaseListModel, BasePageModel } from "./baseModel"

import request from '/@/utils/request';

export const BASE_PATH = "/".replace(/\/+$/, "");

export class BaseAPI {

    apiPath?: string;

    constructor(apiPath: string) {
        this.apiPath = apiPath;
    }

    public async PageGet(body?: BasePageModel) {
        return request({
            url: this.apiPath + '/page',
            method: 'get',
            params: body
        })
    }
    public async PagePost(body?: BasePageModel) {
        return request({
            url: this.apiPath + '/page',
            method: 'post',
            data: body
        })
    }
    //无登录获取
    public async PagePostByNoLogin(body?: BasePageModel) {
        return request({
            url: this.apiPath + '/pageByNoLogin',
            method: 'post',
            data: body
        })
    }
    public async AddPost(body?: BaseInputModel) {
        return request({
            url: this.apiPath + '/add',
            method: 'post',
            data: body
        });
    }
    public async UpdatePost(body?: BaseInputModel) {
        return request({
            url: this.apiPath + '/update',
            method: 'put',
            data: body
        });
    }
    public async DeletePost(body?: BaseDeleteModel) {
        return request({
            url: this.apiPath + '/delete',
            method: 'delete',
            data: body
        });
    }
    public async ListGet(body?: BaseListModel) {
        return request({
            url: this.apiPath + '/list',
            method: 'get',
            params: body
        })
    }
    //无登录获取
    public async ListGetByNoLogin(body?: BaseListModel) {
        return request({
            url: this.apiPath + '/listByNoLogin',
            method: 'get',
            params: body
        })
    }
    public async InfoGet(body?: BaseInfoModel) {
        return request({
            url: this.apiPath + '/detail',
            method: 'get',
            params: body
        })
    }
    public async Other(options?: any) {
        return request(options);
    }


};