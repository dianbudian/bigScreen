// import { BaseInputModel, BasePageModel, BaseListModel } from '../baseModel';
import { BaseAPI } from '../baseApi';

import request from '/@/utils/request';

// 大屏数据
export class LargeScreenApi extends BaseAPI {
	constructor() {
		super('/api/largeScreen');
	}
	// 币总
	public async integralTotal(body?: any) {
		return this.Other({
			url: this.apiPath + '/integralTotal',
			method: 'GET',
			params: body,
		});
	}
	// （“诚”心言事口）
	public async questionsAndAnswersList(body?: any) {
		return this.Other({
			url: this.apiPath + '/questionsAndAnswersList',
			method: 'POST',
			data: body,
		});
	}
	// 开“诚”布公
	public async openInfoList(body?: any) {
		return this.Other({
			url: this.apiPath + '/openInfoList',
			method: 'POST',
			data: body,
		});
	}
	// 志愿者列表
	public async volunteerList(body?: any) {
		return this.Other({
			url: this.apiPath + '/volunteerList',
			method: 'POST',
			data: body,
		});
	}
	// “诚”报
	public async reportList(body?: any) {
		return this.Other({
			url: this.apiPath + '/reportList',
			method: 'POST',
			data: body,
		});
	}
	// 积分总排行
	public async overallRanking(body?: any) {
		return this.Other({
			url: this.apiPath + '/overallRanking',
			method: 'GET',
			params: body,
		});
	}
	// 积分月排行
	public async rankingByMonth(body?: any) {
		return this.Other({
			url: this.apiPath + '/rankingByMonth',
			method: 'GET',
			params: body,
		});
	}
	// 列史
	public async introduce(body?: any) {
		return this.Other({
			url: this.apiPath + '/introduce',
			method: 'GET',
			params: body,
		});
	}
	// 开“诚”布公统计
	public async economyTotal(body?: any) {
		return this.Other({
			url: this.apiPath + '/economyTotal',
			method: 'GET',
			params: body,
		});
	}
	// 子项数据
	public async economyItemData(body?: any) {
		return this.Other({
			url: this.apiPath + '/economyItemData',
			method: 'GET',
			params: body,
		});
	}

	// 诚议统计
	public async civilData(body?: any) {
		return this.Other({
			url: this.apiPath + '/civilData',
			method: 'GET',
			params: body,
		});
	}
	// 诚议列表	
	public async civilList(body?: any) {
		return this.Other({
			url: this.apiPath + '/civilList',
			method: 'POST',
			data: body,
		});
	}
	
	

	//无登录获取
	public async PagePostByNoLogin(body?: any) {
		return request({
			url: 'http://119.4.191.22:801/api/diyData/pageByNoLogin',
			method: 'post',
			data: body
		})
	}

}
