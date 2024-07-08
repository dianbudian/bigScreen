
export interface BasePageModel {

    /**
     * 当前页码
     * @type {number}
     * @memberof BasePageModel
     */
    page?: number;

    /**
     * 页码容量
     * @type {number}
     * @memberof BasePageModel
     */
    pageSize?: number;

    /**
     * 排序字段
     * @type {string}
     * @memberof BasePageModel
     */
    field?: string;

    /**
     * 排序方向
     * @type {string}
     * @memberof BasePageModel
     */
    order?: string;

    /**
     * 降序排序
     * @type {string}
     * @memberof BasePageModel
     */
    descStr?: string;
}


export interface BaseInputModel {
    /**
     * 雪花Id
     * @type {number}
     * @memberof BaseInputModel
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof BaseInputModel
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof BaseInputModel
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof BaseInputModel
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof BaseInputModel
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof BaseInputModel
     */
    isDelete?: boolean;
}


export interface BaseDeleteModel {
    /**
     * 主键Id
     * @type {number}
     * @memberof BaseDeleteModelSSS
     */
    id: number;
}


export interface BaseInfoModel {
    /**
     * 主键Id
     * @type {number}
     * @memberof BaseInfoModel
     */
    id: number;
}

export interface BaseListModel {
}

