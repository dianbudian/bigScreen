import { BaseAPI } from '../baseApi';
export class DiyReportApi extends BaseAPI {
	constructor() {
		super('/api/diyReport');
	}

		// 导出
		public async diyReportexport(body?: any) {
			return this.Other({
				url: this.apiPath + '/export',
				method: 'POST',
				data: body,
				responseType: 'blob'
			});
		}

	// 根据sql查询信息
	public async SearchBySql(body?: any) {
		return this.Other({
			url: this.apiPath + '/searchBySql',
			method: 'POST',
			data: body,
		});
	}

	// 保存报表专业配置
	public async savePut(body?: any) {
		return this.Other({
			url: this.apiPath + '/save',
			method: 'PUT',
			data: body,
		});
	}

	/**
	 * 获取最新数据
	 *  @param body
	 * @returns
	 */
	public async getnewData(body?: any) {
		return this.Other({
			url: this.apiPath + `/newData`,
			method: 'GET',
			params: body,
		});
	}

	// 获取分页列表
	public async diyReportPage(body?: any) {
		return this.Other({
			url: this.apiPath + '/page',
			method: 'POST',
			data: body,
		});
	}

	// 保存动态报表配置
	public async saveByDynamicPut(body?: any) {
		return this.Other({
			url: this.apiPath + '/saveByDynamic',
			method: 'PUT',
			data: body,
		});
	}
	
	// 保存采集报表配置
	public async saveByDynamicToFrom(body?: any) {
		return this.Other({
			url: this.apiPath + '/saveByDynamicToFrom',
			method: 'PUT',
			data: body,
		});
	}
	
}
