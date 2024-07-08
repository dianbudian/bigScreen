// import { BaseInputModel, BasePageModel, BaseListModel } from '../baseModel';
import { BaseAPI } from '../baseApi';
// 天气
export class WeatherApi extends BaseAPI {
	constructor() {
		super('https://www.tianqiapi.com/api/?version=v6');
	}
	// 
	public async getWeatherV6(body?: any) {
		return this.Other({
			url: 'https://www.tianqiapi.com/api/?version=v6',
			method: 'GET',
			params: body,
		});
	}

}
