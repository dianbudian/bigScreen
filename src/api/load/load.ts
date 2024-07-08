import { BaseAPI } from '../baseApi';
import request from '/@/utils/request';

export class loadApi extends BaseAPI {
    constructor() {
        super('http://119.4.191.22:801/api/diyTable');
    }

    // 查询是否需要登录
    public async IsNeedToLogin(body?: any) {
        return request({
            url: this.apiPath + `/IsNeedToLogin/${body}`,
            method: 'get',
        })
    }

    // 无登录获取采集报表列名
    public async dataheader(body?: any) {
        return request({
            url: this.apiPath + `/dataheader/${body}`,
            method: 'get',
        })
    }

    // 无登录新增采集报表
    public async diyTableData(id?: any, form?: any) {
        return request({
            url: this.apiPath + `/dataition/${id}`,
            method: 'post',
            data: { ...form }
        })
    }
}