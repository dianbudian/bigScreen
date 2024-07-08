import { BaseInputModel, BasePageModel, BaseListModel } from '../baseModel';
import { BaseAPI } from '../baseApi';
// //表单数据
export class DiyDataApi extends BaseAPI {
	constructor() {
		super('/api/diyData');
	}
	// 导出
	public async diyReportExport(body?: any) {
		return this.Other({
			url: this.apiPath + '/Export',
			method: 'POST',
			data: body,
		});
	}
	
}
