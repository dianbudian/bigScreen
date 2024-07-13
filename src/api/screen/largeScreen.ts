import { BaseAPI } from '../baseApi';

// 大屏数据
export class LargeScreenApi extends BaseAPI {
	constructor() {
		// super('/api/largeScreen'); //v1
		super('/api/Screen'); //v2
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
	// public async PagePostByNoLogin(body?: any) {
	// 	return this.Other({
	// 		url: 'http://119.4.191.22:801/api/diyData/pageByNoLogin',
	// 		method: 'post',
	// 		data: body
	// 	})
	// }

	//通用分页
	public async getPage(body?: any) {
		return this.Other({
			url: this.apiPath + '/getPage',
			method: 'POST',
			data: body,
		});
	}

	//添加留言
	public async addQuestions(body?: any) {
		return this.Other({
			url: this.apiPath + '/addQuestions',
			method: 'POST',
			data: body,
		});
	}

	//获取街道列表
	public async streetList(body?: any) {
		return this.Other({
			url: this.apiPath + '/streetList',
			method: 'GET',
			params: body,
		});
	}
	//获取社区列表
	public async communityList(body?: any) {
		return this.Other({
			url: this.apiPath + '/communityList',
			method: 'GET',
			params: body,
		});
	}
	//三务公开统计
	public async openInfoTotal(body?: any) {
		return this.Other({
			url: this.apiPath + '/openInfoTotal',
			method: 'GET',
			params: body,
		});
	}
	//问答统计
	public async questionsAndAnswersTotal(body?: any) {
		return this.Other({
			url: this.apiPath + '/questionsAndAnswersTotal',
			method: 'GET',
			params: body,
		});
	}
	//诚报统计
	public async reportTotal(body?: any) {
		return this.Other({
			url: this.apiPath + '/reportTotal',
			method: 'GET',
			params: body,
		});
	}
	//区级统计
	public async districtTotal(body?: any) {
		return this.Other({
			url: this.apiPath + '/districtTotal',
			method: 'GET',
			params: body,
		});
	}
	//清除缓存
	public async clearCache(body?: any) {
		return this.Other({
			url: this.apiPath + '/clearCache',
			method: 'DELETE',
			params: body,
		});
	}


}
