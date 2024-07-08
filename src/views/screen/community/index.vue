<template>
	<!-- 社区 -->
	<div class="screen-page flex flex-column">
		<!-- 大标题 -->
		<header class="header">
			<div class="flex flex-ai-center flex-jc-center" style="height:60px">
				<img src="/@/assets/images/logo.png" class="logo" width="40" height="40" />
				<div class="position-relative">
					<b class="gradient-color screen-title position-relative z-index-up">新津区基层治理{{state.title}}“诚”列馆</b>
					<b class="screen-title title-shadow">新津区基层治理{{state.title}}“诚”列馆</b>
				</div>
			</div>
			<div class="screen-subtitle">真诚待人 真心为民</div>

			<!-- 时间 -->
			<div class="date">
				<span class="num">{{state.pageDate?.year}}</span> 年
				<span class="num">{{state.pageDate?.month}}</span> 月
				<span class="num">{{state.pageDate?.day}}</span> 日
				<span class="num">{{state.pageDate?.hour}}:{{state.pageDate?.minute}}:{{state.pageDate?.second}}</span>
			</div>

			<!-- 天气/二维码 -->
			<div class="weather">
				<iframe scrolling="no" src="https://widget.tianqiapi.com?style=tg&skin=pitaya&city=新津&color=fff" style="color: #fff; " frameborder="0" width="100%" height="50" allowtransparency="true"></iframe>
				<img src="/@/assets/images/community/qr.jpg" class="qr" width="66" height="66" />
			</div>
		</header>

		<main class="main-container">
			<!-- 左侧 -->
			<div class="col-left">
				<div class="card">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">{{state.title}}“诚”列史</h2>
							<h2 class="card-title title-shadow">{{state.title}}“诚”列史</h2>
						</div>
					</div>
					<div class="card-body">
						<!-- 图片滚动 -->
						<el-carousel class="about" height="250px" :interval="3000" arrow="always">
							<el-carousel-item v-for="(item, index) in state.introduce.picture" :key="index">
								<img class="img" :src="item" />
							</el-carousel-item>
							<ul class="about-amount-layer">
								<li>
									<span class="num">{{state.introduce.square}}</span>面积（平方公里）
								</li>
								<li>
									<span class="num">{{state.introduce.households}}</span>户数（户）
								</li>
								<li>
									<span class="num">{{state.introduce.peopleNum}}</span>人数（人）
								</li>
								<li>
									<span class="num">{{state.introduce.partyMemberNum}}</span>党员（人）
								</li>
							</ul>
						</el-carousel>
						<!-- 文本介绍 -->

						<p class="about-text">{{state.introduce.situation}}</p>
						<!-- 党员列表 '没有文本介绍时' -->
					</div>
				</div>

				<!--  -->
				<div class="card mt20 report-news-card flex-grow">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">{{state.title}}“诚”报</h2>
							<h2 class="card-title title-shadow">{{state.title}}“诚”报</h2>
						</div>
					</div>
					<div class="card-body">
						<vue3-seamless-scroll ref="reportNewsRef" :list="state.reportListData" :singleHeight="0" :step="0.5" :hover="true" :limitScrollNum="3" class="seamless-wrap">
							<ul class="report-news">
								<li v-for="(item,index) in state.reportListData" :key="index">
									<div class="imgbox">
										<img src="/@/assets/images/community/news.jpg" onerror="this.src='/@/assets/images/logo.png'" />
									</div>
									<div class="main">
										<p class="title">{{item.xiangguanneirong}}</p>
										<p>
											<el-text type="warning" size="small">[{{item.leixing}}]</el-text>
											<el-text type="info" class="date" size="small">时间:</el-text>
											<small>{{item.fabushijian}}</small>
										</p>
									</div>
								</li>
							</ul>
						</vue3-seamless-scroll>
					</div>
				</div>
			</div>
			<!-- 中间 -->
			<div class="col-main">
				<div class="public-card">
					<div class="card-header">
						<div class="position-relative title-bg">
							<h2 class="card-title position-relative z-index-up">开“诚”布公</h2>
							<h2 class="card-title title-shadow">开“诚”布公</h2>
						</div>
					</div>
					<div class="card-body">
						<div class="total-box">
							<div class="item">
								总收入
								<small>(元)</small>
								<p class="num gradient-color">{{state.economyTotal?.incomeTotal}}</p>
							</div>
							<div class="item">
								总支出
								<small>(元)</small>
								<p class="num gradient-color">{{state.economyTotal?.expensesTotal}}</p>
							</div>
							<div class="item">
								余额
								<small>(元)</small>
								<p class="num gradient-color">{{state.economyTotal?.balance}}</p>
							</div>
						</div>
						<!--  -->
						<div class="company-box">
							<div class="item" v-for="(item,index) in state.economyItemData" :key="index">
								<p class="gradient-color-2 center">{{item.accountType}}</p>
								<ul>
									<li>
										<span>收入金额</span>
										<span>
											<em>{{item.incomeTotal}}</em>元
										</span>
									</li>
									<li>
										<span>支出金额</span>
										<span>
											<em>{{item.expensesTotal}}</em>元
										</span>
									</li>
									<li>
										<span>余 额</span>
										<span>
											<em>{{item.balance}}</em>元
										</span>
									</li>
								</ul>
							</div>
						</div>
						<!-- compnay-box end -->
						<div class="public-news-card">
							<!-- 党务 -->
							<div class="public-news-box">
								<el-carousel height="150px" :interval="3000" arrow="always" indicator-position="outside">
									<el-carousel-item v-for="(item,index) in state.openList1" :key="index">
										<div class="news">
											<div class="class-title" @click="openTableDialog(state.tableConfig.openInfoList,'党务公开')">{{item?.gongkaileixing}}</div>
											<img class="img" :src="item.thumb" @click="showViewer(item.xinxifujian)" />
											<div>
												<p class="title">{{item.xinxibiaoti}}</p>
												<p class="info">{{item.gongkaishijian}}</p>
											</div>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
							<!-- 财务 -->
							<div class="public-news-box">
								<el-carousel height="150px" :interval="3000" arrow="always" indicator-position="outside">
									<el-carousel-item v-for="(item,index) in state.openList2" :key="index">
										<div class="news">
											<div class="class-title" @click="openTableDialog(state.tableConfig.openInfoList,'财务公开')">{{item?.gongkaileixing}}</div>
											<img class="img" :src="item.thumb" @click="showViewer(item.xinxifujian)" />
											<div>
												<p class="title">{{item.xinxibiaoti}}</p>
												<p class="info">{{item.gongkaishijian}}</p>
											</div>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
							<!-- 村务 -->
							<div class="public-news-box">
								<el-carousel height="150px" :interval="3000" arrow="always" indicator-position="outside">
									<el-carousel-item v-for="(item,index) in state.openList3" :key="index">
										<div class="news">
											<div class="class-title" @click="openTableDialog(state.tableConfig.openInfoList,'村务公开')">{{item?.gongkaileixing}}</div>
											<img class="img" :src="item.thumb" @click="showViewer(item.xinxifujian)" />
											<div>
												<p class="title">{{item.xinxibiaoti}}</p>
												<p class="info">{{item.gongkaishijian}}</p>
											</div>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<!-- news end -->
					</div>
				</div>
				<div class="card mt20 flex-grow overflow-hidden argument-card">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">民事“诚”议</h2>
							<h2 class="card-title title-shadow">民事“诚”议</h2>
						</div>
					</div>
					<div class="card-body flex h5-column">
						<ul class="amount-box">
							<li>
								<div>
									<span class="num gradient-color">{{state.argumentAmount?.topicsTotal}}</span>
									<small>个</small>
									<p class="title">发布议题</p>
								</div>
							</li>
							<li>
								<div>
									<span class="num gradient-color">{{state.argumentAmount?.meetingTotal}}</span>
									<small>场</small>
									<p class="title">召开会议</p>
								</div>
							</li>
							<li>
								<div>
									<span class="num gradient-color">{{state.argumentAmount?.personTotal}}</span>
									<small>人</small>
									<p class="title">参与议事人员</p>
								</div>
							</li>
							<li>
								<div>
									<span class="num gradient-color">{{state.argumentAmount?.matterTotal}}</span>
									<small>项</small>
									<p class="title">决议事项</p>
								</div>
							</li>
						</ul>
						<vue3-seamless-scroll ref="argumentRef" :list="state.argumentListData" :singleHeight="0" :step="0.5" :hover="true" :limitScrollNum="3" class="seamless-wrap">
							<ul class="argument-list">
								<li v-for="(item,index) in state.argumentListData" :key="index">
									<div class="main">
										<p class="title">{{item.yiti}}</p>
										<el-text class="date" type="info" size="small">{{item.CreateTime}}</el-text>
									</div>
									<el-text class="state" :type="item.yitizhuangtai=='已决议'?'success':'danger'">{{item.yitizhuangtai}}</el-text>
								</li>
							</ul>
						</vue3-seamless-scroll>
					</div>
				</div>
			</div>
			<!-- 右侧 -->
			<div class="col-right">
				<div class="card">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">信义“诚”折</h2>
							<h2 class="card-title title-shadow">信义“诚”折</h2>
						</div>
					</div>
					<div class="card-body flex flex-grow h5-column">
						<!-- 统计 -->
						<div class>
							<!-- 数量 -->
							<ul class="money-box">
								<li class="plate2">
									<span class="num gradient-color">{{state.inergralTotal?.incomeTotal}}</span>
									<p class="title">存积分</p>
								</li>
								<li class="plate3">
									<span class="num gradient-color-3">{{state.inergralTotal?.expensesTotal}}</span>
									<p class="title">享积分</p>
								</li>
								<li class="plate4">
									<span class="num gradient-color">{{state.inergralTotal?.volunteerTotal}}</span>
									<small>户</small>
									<p class="title">志愿者总数</p>
								</li>
								<li class="plate4">
									<span class="num gradient-color">{{state.inergralTotal?.durationTotal}}</span>
									<small>小时</small>
									<p class="title">服务总时长</p>
								</li>
							</ul>
							<!-- 志愿者队伍 -->
							<div class="volunteer">
								<div class="volunteer-title">志愿者队伍</div>
								<el-carousel height="106px" :interval="3000" arrow="hover" indicator-position="none">
									<el-carousel-item v-for="(item,index) in state.volunteerList" :key="index">
										<ul>
											<li>
												<span class="label">队伍名称</span>
												<div class="content">
													<el-tooltip effect="dark" :content="item.duiwumingcheng" placement="top-start">{{item.duiwumingcheng}}</el-tooltip>
												</div>
											</li>
											<li>
												<span class="label">队伍组成</span>
												<div class="content">
													<el-tooltip effect="dark" :content="item.duiwuzucheng" placement="top-start">{{item.duiwuzucheng}}</el-tooltip>
												</div>
											</li>
											<li>
												<span class="label">服务内容</span>
												<div class="content">
													<el-tooltip effect="dark" :content="item.fuwuneirong" placement="top-start">{{item.fuwuneirong}}</el-tooltip>
												</div>
											</li>
										</ul>
									</el-carousel-item>
								</el-carousel>
							</div>
							<!-- 志愿内容 -->
							<!-- <div class="volunteer">
								<div class="volunteer-title">志愿内容</div>
								<ul>
									<li>
										<span class="label">内容发布</span>
										<div class="content">
											<el-tooltip effect="dark" content="由退役军人组成的志愿服务队伍由退役军人组成的志愿服务队伍" placement="left-start">由退役军人组成的志愿服务队伍，以自由退役军人组成的志愿服务队伍</el-tooltip>
										</div>
									</li>
									<li>
										<span class="label">开始时间</span>
										<div class="content">2024-06-28</div>
									</li>
									<li>
										<span class="label">积分数量</span>
										<div class="content">2</div>
									</li>
								</ul>
							</div>-->
						</div>
						<!-- 排行 -->
						<div class="flex flex-column h5-mt20" style="min-width: 210px">
							<!-- 排行标题 -->
							<div class="ranking-title-bar">
								信义币
								<div class="ranking-tag-title">
									<span :class="state.rankingTag == '总排行' ? 'active' : ''" @click="clickRankingTag('总排行')">总排行</span>
									<span :class="state.rankingTag == '月排行' ? 'active' : ''" @click="clickRankingTag('月排行')">月排行</span>
								</div>
							</div>

							<!-- 排行列表 -->
							<!-- 前三名 -->
							<div class="ranking">
								<div class="item" v-for="(item,index) in state.rankingTop" :key="index">
									<span class="flex flex-ai-center title">
										<el-image :src="item['icon']" fit="contain" class="cup-img"></el-image>
										<el-image fit="contain" class="head-img" @click="showViewer([item.headPortrait])">
											<template #error>
												<img src="/@/assets/images/community/noimg.png" class="error-img" />
											</template>
										</el-image>
										{{item.name}}
									</span>
									<span class="num">{{item.total}}</span>
								</div>
							</div>
							<!-- 前三名后续 -->
							<div class="flex-grow" style="height: 220px">
								<vue3-seamless-scroll ref="rankingRef" :list="state.rankingOther" :singleHeight="0" :step="0.3" :hover="true" :limitScrollNum="5" class="seamless-wrap">
									<div class="ranking">
										<div class="item" v-for="(item,index) in state.rankingOther" :key="index">
											<span class="flex flex-ai-center title">
												<el-text class="ranking-num">{{index+4}}</el-text>
												<el-image fit="contain" class="head-img" @click="showViewer([item.headPortrait])">
													<template #error>
														<img src="https://xjly.hbzg.cn/boercun/logo.png" class="error-img" />
													</template>
												</el-image>
												{{item.name}}
											</span>
											<span class="num">{{item.total}}</span>
										</div>
									</div>
								</vue3-seamless-scroll>
							</div>
						</div>
					</div>
				</div>
				<div class="card mt20 flex-grow question-card">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">“诚”心言事口</h2>
							<h2 class="card-title title-shadow">“诚”心言事口</h2>
						</div>
						<div>
							<a class="more" href="javascript:;" @click="openQuestionFrom()">我要提问</a>
							<a class="more" href="javascript:;" @click="openTableDialog(state.tableConfig.questionList,'“诚”心言事口')">更多</a>
						</div>
					</div>
					<div class="card-body">
						<vue3-seamless-scroll ref="questionRef" :list="state.questionListData" :singleHeight="0" :step="0.5" :hover="true" :limitScrollNum="3" class="seamless-wrap">
							<ul class="question-list">
								<li v-for="(item,index) in state.questionListData" :key="index" @click="openDetail(state.tableConfig.questionList, item)" >
									<img class="icon" src="/@/assets/images/community/icon-news.png" />
									<div class="main">
										<div class="title">{{item.wentineirong}}</div>
										<div class="date">{{item.CreateTime}}</div>
										<p class="replay" v-if="item.huifuneirong.length > 0">回复：{{item.huifuneirong}}</p>
										<el-text type="danger" size="small" v-if="item.huifuneirong.length < 1">[未回复]</el-text>
									</div>
								</li>
							</ul>
						</vue3-seamless-scroll>
					</div>
				</div>
			</div>
		</main>

		<!-- 图片预览组件 -->
		<el-image-viewer v-if="state.isViewer" :urlList="state.pics" @close="closeViewer" :zIndex="9999"></el-image-viewer>
		<!-- 列表 -->
		<tableDialog ref="tableDialogRef"></tableDialog>
		<!-- 详情 -->
		<DetailDialog ref="detailDialogRef"></DetailDialog>
		<!-- 发起质疑 -->
		<QuestionFormDialog ref="questionFormDialogRef"></QuestionFormDialog>
	</div>
</template>

<script lang="ts" setup>
import {
	onMounted,
	// onUnmounted,
	reactive,
	ref,
	// defineAsyncComponent,
	getCurrentInstance,
} from "vue";
// import { ElMessageBox, ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
// import { debounce } from 'lodash';
import { getAPI } from "/@/utils/request";
import {
	LargeScreenApi,
	WeatherApi,
} from "/@/api/sysApi";
// import { formatDate } from "/@/utils/formatTime";

import tableDialog from "../component/tableDialog.vue";
import DetailDialog from '../component/detailDialog.vue';
import QuestionFormDialog from "../component/questionFormDialog.vue";

import AboutPic from "/@/assets/images/community/about.jpg";

const route = useRoute();
const questionRef = ref(null);
const reportNewsRef = ref(null);
const questionFormDialogRef = ref(null);
const tableDialogRef = ref(null);
const detailDialogRef = ref(null);

const APIURL = "https://xjly.hbzg.cn";
import rankTop1 from "/@/assets/images/community/rank_top1.png";
import rankTop2 from "/@/assets/images/community/rank_top2.png";
import rankTop3 from "/@/assets/images/community/rank_top3.png";
let icons = [rankTop1, rankTop2, rankTop3];

// 默认数据
//诚议统计
const argumentAmount = {
	topicsTotal: "-",
	meetingTotal: "-",
	personTotal: "-",
	matterTotal: "-",
};
//开诚布公统计
const economyTotal = {
	incomeTotal: "-",
	expensesTotal: "-",
	balance: "-",
};
//积分统计
const inergralTotal = {
	incomeTotal: "-",
	expensesTotal: "-",
	volunteerTotal: "-",
	durationTotal: "-",
};
const state = reactive({
	id: "" as String | Number,
	title: "" as String,
	isViewer: false,
	pics: [],
	tableConfig: {} as any,
	pageDate: {
		year: "0000",
		month: "00",
		day: "00",
		hour: "00",
		minute: "00",
		second: "00",
	},
	//列史
	introduce: {
		square: 0,
		households: 0,
		peopleNum: 0,
		partyMemberNum: 0,
		situation: "",
		history: "",
		picture: [],
	},
	//开诚布公
	economyTotal: economyTotal as any,
	economyItemData: [] as any,
	//诚报
	reportListData: [] as Array<any>,
	//诚议
	argumentAmount: argumentAmount as any,
	argumentListData: [] as Array<any>,
	//积分统计
	inergralTotal: inergralTotal as any,
	//排行
	rankingTag: "总排行" as String,
	rankingTop: [] as Array<any>,
	rankingOther: [] as Array<any>,
	totalRankingTop: [] as Array<any>,
	monthRankingTop: [] as Array<any>,
	totalRankingOther: [] as Array<any>,
	monthRankingOther: [] as Array<any>,
	//三务公开
	openList1: [] as Array<any>,
	openList2: [] as Array<any>,
	openList3: [] as Array<any>,
	//志愿者队伍
	volunteerList: [] as Array<any>,
	//问题
	questionListData: [] as Array<any>,
});

onMounted(() => {
	state.id = route.query?.id ?? "35300665880105";
	getIntroduce();
	getEconomyTotal();
	getEconomyItemData();
	getWeather();
	getPageDate();
	getIntegralTotal();
	getReportList();
	questionsAndAnswersList();
	getTotalRanking();
	getMonthRanking();
	getArgumentAmount();
	getArgumentList();
	//三务
	getOpenList("党务");
	getOpenList("财务");
	getOpenList("村务");
	//
	getVolunteerList();
});
const getImg = (jsonStr: String) => {
	if (!jsonStr) return false;
	let json = JSON.parse(jsonStr);
	if (json.length && json[0]?.url) {
		return "/" + json[0].url;
	}
};
const getWeather = async () => {
	// https://widget.tianqiapi.com?style=tg&skin=pitaya&city=新津&color=fff
	const { data } = await getAPI(WeatherApi).getWeatherV6({
		city: "新津",
	});
	console.log(data);
};
// 时钟
const getPageDate = () => {
	setInterval(() => {
		let now = new Date();
		let date = {
			year: now.getFullYear(),
			month: ("0" + (now.getMonth() + 1)).substr(-2),
			day: ("0" + now.getDate()).substr(-2),
			hour: ("0" + now.getHours()).substr(-2),
			minute: ("0" + now.getMinutes()).substr(-2),
			second: ("0" + now.getSeconds()).substr(-2),
		};
		state.pageDate = { ...date };
	}, 1000);
};
//列史
const getIntroduce = async () => {
	const { data } = await getAPI(LargeScreenApi).introduce({
		id: state.id,
	});
	let tmp = data.result ?? {};
	tmp.picture = transformImgData(tmp.picture);
	state.introduce = tmp;
	state.title = tmp.communityName;
};
//图片数据转换
const transformImgData = (imgString: string) => {
	let imgs = [] as any;
	if (imgString) {
		let json = JSON.parse(imgString);
		if (json.length && json[0]?.url) {
			json = json.map((item: any) => {
				return APIURL + item.url;
			});
			imgs = json;
		} else {
			imgs = ["/@/assets/images/community/nopic.jpg"];
		}
	}
	return imgs;
};
//三务
const getOpenList = async (tag: String) => {
	let query = {
		page: 1,
		pageSize: 5,
		type: tag,
		id: state.id,
	};
	const { data } = await getAPI(LargeScreenApi).openInfoList(query);
	let tmp = data.result?.list?.items ?? [];
	state.tableConfig.openInfoList = data.result.tableColumns;
	tmp = tmp.map((item: any) => {
		item.xinxifujian = transformImgData(item.xinxifujian);
		item.thumb = item.xinxifujian[0];
		return item;
	});

	if (tag === "党务") {
		state.openList1 = tmp;
	}
	if (tag === "财务") {
		state.openList2 = tmp;
	}
	if (tag === "村务") {
		state.openList3 = tmp;
	}
};

//积分总计
const getIntegralTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).integralTotal({
		id: state.id,
	});
	state.inergralTotal = data.result ?? {};
};
//诚报
const getReportList = async () => {
	let query = {
		page: 1,
		pageSize: 10,
		id: state.id,
	};
	const { data } = await getAPI(LargeScreenApi).reportList(query);
	state.reportListData = data.result?.list?.items ?? [];
	state.tableConfig.reportList = data.result.tableColumns;
};
//言
const questionsAndAnswersList = async () => {
	let query = {
		page: 1,
		pageSize: 10,
		id: state.id,
	};
	const { data } = await getAPI(LargeScreenApi).questionsAndAnswersList(
		query
	);
	state.questionListData = data.result?.list?.items ?? [];
	state.tableConfig.questionList = data.result.tableColumns;
};
//诚议统计
const getArgumentAmount = async () => {
	const { data } = await getAPI(LargeScreenApi).civilData({
		id: state.id,
	});
	state.argumentAmount = data.result ?? {};
};
//诚议列表
const getArgumentList = async () => {
	let query = {
		page: 1,
		pageSize: 10,
		id: state.id,
	};
	const { data } = await getAPI(LargeScreenApi).civilList(query);
	state.argumentListData = data.result?.list?.items ?? [];
	state.tableConfig.argumentList = data.result.tableColumns;
};

// 开诚布公统计
const getEconomyTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).economyTotal({
		id: state.id,
	});
	state.economyTotal = data.result ?? {};
};
const getEconomyItemData = async()=>{
	const { data } = await getAPI(LargeScreenApi).economyItemData({
		id: state.id,
	});
	let tmp = data.result ?? [];
	state.economyItemData = tmp;
}
//列史
const getVolunteerList = async () => {
	const { data } = await getAPI(LargeScreenApi).volunteerList({
		id: state.id,
		page: 1,
		pageSize: 10,
	});
	let tmp = data.result?.list?.items ?? [];
	state.volunteerList = tmp;
	state.tableConfig.volunteerList = data.result.tableColumns;
};
// 总排行
const getTotalRanking = async () => {
	const { data } = await getAPI(LargeScreenApi).overallRanking({
		id: state.id,
		page: 1,
		pageSize: 10,
	});
	let tmp = data.result ?? [];
	tmp = tmp.map((item: any, index: number) => {
		item.icon = icons[index];
		item.headPortrait = getImg(item.headPortrait);
		return item;
	});
	state.totalRankingTop = tmp.slice(0, 3);
	state.totalRankingOther = tmp.slice(3);

	state.rankingTop = state.totalRankingTop;
	state.rankingOther = state.totalRankingOther;
};
// 月排行
const getMonthRanking = async () => {
	const { data } = await getAPI(LargeScreenApi).rankingByMonth({
		id: state.id,
		page: 1,
		pageSize: 10,
	});
	let tmp = data.result ?? [];
	tmp = tmp.map((item: any, index: number) => {
		item.icon = icons[index];
		item.headPortrait = getImg(item.headPortrait);
		return item;
	});
	state.monthRankingTop = tmp.slice(0, 3);
	state.monthRankingOther = tmp.slice(3);
};
// 切换排行
const clickRankingTag = (tag: String) => {
	state.rankingTag = tag;
	if (tag == "总排行") {
		state.rankingTop = state.totalRankingTop;
		state.rankingOther = state.totalRankingOther;
	} else {
		state.rankingTop = state.monthRankingTop;
		state.rankingOther = state.monthRankingOther;
	}
};
// 列表弹窗
const openTableDialog = (tableConfig: any, title: String) => {
	if (tableConfig) {
		tableDialogRef?.value.openDialog(tableConfig, title);
	}
};
// 详情弹窗
const openDetail = (tableConfig: any, row : any) => {
	if (tableConfig) 
	detailDialogRef?.value.openDialog(tableConfig, row);
};
// 我要质疑弹窗
const openQuestionFrom = () => {
	console.log("弹窗");
	// let tableInfo = getTableConfig(state.id);
	questionFormDialogRef.value?.openDialog();
};
const showViewer = (pic: any) => {
	state.pics = pic;
	state.isViewer = true;
};
const closeViewer = () => {
	state.isViewer = false;
	state.pics = [];
};
</script>

<style lang="scss">
@font-face {
	font-family: "electronicFont";
	src: url("/@/assets/font/DS-DIGIT.TTF");
}
body,
#app {
	height: 100%;
	overflow: hidden;
}
</style>
<style lang="scss" scoped>
div {
	box-sizing: border-box;
}
// 大屏容器
.screen-page {
	--main-default-color: #fff;
	--main-primary-color: #c7feff;
	--main-primary-color-2: #88feff;
	--main-primary-color-3: #27acc6;

	--main-sub-color: #f2b543;
	--border-color: #123f53;

	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background: url("/@/assets/images/community/bg.jpg");
	background-size: 100% 100%;
	background-attachment: fixed;
	background-color: #10141a;
	font-size: 14px;
	color: var(--main-primary-color);
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
// 滚动条
::-webkit-scrollbar-track-piece {
	background: var(--border-color);
}
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
}
::-webkit-scrollbar-thumb {
	background: var(--main-primary-color-3);
	border-radius: 5px;
}
// 渐变色
.gradient-color {
	background-image: linear-gradient(
		to bottom,
		#fff,
		var(--main-primary-color-3)
	);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-color-2 {
	background-image: linear-gradient(to bottom, #fff, #fff, #45c6e3);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-color-3 {
	background-image: linear-gradient(to bottom, #fff, var(--main-sub-color));
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

// 渐变色变量
@mixin gradientColor {
	background-image: linear-gradient(
		to bottom,
		#fff,
		var(--main-primary-color-3)
	);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.title-gradient {
	background-image: linear-gradient(
		to bottom,
		#fff,
		var(--main-primary-color-3)
	);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
// 数字
.num {
	font-family: "electronicFont" !important;
	font-size: 35px;
	text-align: center;
	height: 45px;
	line-height: 45px;
}
// 标题投影
.title-shadow {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	color: #000;
	text-shadow: 0 5px 5px #000;
}
// 通用卡片
.card {
	display: flex;
	flex-direction: column;
	.card-header {
		height: 36px;
		background: url("/@/assets/images/community/card-titlebg.png") left
			bottom no-repeat;
		display: flex;
		justify-content: space-between;
		.card-title {
			line-height: 36px;
			margin-left: 15px;
			font-size: 18px;
			@include gradientColor;
		}
		.more {
			display: inline-block;
			margin-top: 15px;
			margin-right: 15px;
			font-size: 12px;
			color: var(--main-sub-color);
		}
	}
	.card-body {
		flex-grow: 1;
		position: relative;
		padding: 10px;
		border-bottom: 1px var(--border-color) solid;
		min-height: 100px;
		overflow: hidden;
		&::before {
			content: "";
			position: absolute;
			width: 6px;
			height: 100%;
			left: 0;
			top: 0;
			background: url("/@/assets/images/community/border-left.png") right
				bottom no-repeat;
			background-size: 100% 100%;
		}
		&::after {
			content: "";
			position: absolute;
			width: 6px;
			height: 100%;
			right: 0;
			top: 0;
			background: url("/@/assets/images/community/border-right.png") right
				bottom no-repeat;
			background-size: 100% 100%;
		}
	}
}
// 顶部
.header {
	width: 100%;
	height: 93px;
	background: url("/@/assets/images/community/top.png") center bottom
		no-repeat;
	background-size: auto 100%;
	text-align: center;
	.logo {
		margin-right: 10px;
	}
	.screen-title {
		font-size: 28px;
	}
	.screen-subtitle {
		margin-top: 10px;
		font-size: 14px;
		color: #42aabc;
	}
	.date {
		position: absolute;
		top: 20px;
		left: 30px;
		color: var(--main-primary-color);
	}
	.weather {
		position: absolute;
		top: 20px;
		right: 30px;
		display: flex;
		align-items: center;
	}
}
// 内容框架
.main-container {
	margin: 10px 10px 10px 10px;
	flex-grow: 1;
	overflow: hidden;
	display: flex;
	justify-content: space-between;
	.col-left {
		width: 450px;
		height: 100%;
		margin: 0 10px;
		display: flex;
		flex-direction: column;
	}
	.col-main {
		margin: 0 10px;
		height: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	.col-right {
		width: 568px;
		height: 100%;
		margin: 0 10px;
		display: flex;
		flex-direction: column;
	}
}
//简介
.about {
	:deep(.el-carousel__indicators--horizontal) {
		bottom: initial;
		top: 0;
	}
}
.about-text {
	margin-top: 10px;
	padding-right: 10px;
	max-height: 180px;
	text-align: justify;
	text-indent: 2em;
	overflow-y: auto;
}

.about-amount-layer {
	position: absolute;
	z-index: 2;
	left: 0;
	right: 0;
	bottom: 0;
	background: #0006;
	padding: 10px 20px;
	display: flex;
	justify-content: space-around;
	li {
		text-align: center;
		flex-grow: 1;
		color: #fff;
		font-size: 12px;
	}
	.num {
		display: block;
		color: var(--main-primary-color);
		font-size: 24px;
	}
}
//问答
.question-card {
	overflow: hidden;
	.question-list {
		li {
			display: flex;
			background: url();
			padding: 10px 0;
			.icon {
				width: 39px;
				height: 46px;
				margin-right: 8px;
			}
			.title {
				color: #fff;
				line-height: 1.2;
			}
			.main {
				flex-grow: 1;
			}
			.date {
				color: #999;
				font-size: 12px;
			}
			.replay {
				line-height: 1.2;
				font-size: 12px;
			}
		}
	}
}
.seamless-wrap {
	height: 100%;
	width: 100%;
	overflow: hidden;
	:deep(.el-table tr) {
		background-color: none;
	}
}
// 集体经济-总面板
.public-card {
	padding: 20px;
	width: 100%;
	background: url("/@/assets/images/community/main-box.png") center center
		no-repeat;
	background-size: 100% 100%;

	.card-header {
		display: flex;
	}
	.title-bg {
		background: url("/@/assets/images/community/kuohao.png") left center
			no-repeat;
	}
	.card-title {
		width: 160px;
		height: 40px;
		text-align: center;
		line-height: 36px;
		font-size: 18px;
		@include gradientColor;
	}
}
// 集体经济-总统计
.total-box {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.item {
		flex-basis: 30%;
		padding-bottom: 40px;
		margin: 10px 1.5%;
		background: url("/@/assets/images/community/plate.png") center bottom
			no-repeat;
		background-size: 100% auto;
		text-align: center;
		font-size: 16px;
		color: var(--main-default-color);
		.num {
			height: auto;
			line-height: 1;
		}
		small {
			font-size: 12px;
		}
	}
}
// 集体经济-企业统计
.company-box {
	display: flex;
	flex-wrap: wrap;
	.item {
		padding: 10px 2%;
		flex-grow: 1;
		margin: 10px 10px auto 10px;
		background: url("/@/assets/images/community/box1.png") center bottom
			no-repeat;
		background-size: 100% 100%;
		li {
			padding: 5px 8px;
			font-size: 12px;
			margin-top: 2px;
			border: 1px solid;
			border-image: linear-gradient(
					to right,
					#075b6d,
					transparent,
					#075b6d
				)
				1;
			display: flex;
			justify-content: space-between;
			em {
				font-family: "electronicFont";
				font-size: 16px;
				color: var(--main-default-color);
				line-height: 1;
				font-style: normal;
				margin-right: 2px;
				// @include gradientColor()
			}
		}
	}
}
// 集体经济-三务公开
.public-news-card {
	display: flex;
	justify-content: space-between;
}
.public-news-box {
	flex-grow: 1;
	padding: 10px;
	margin: 10px 10px 0 10px;
	background: rgba(9, 21, 25, 0.4);

	.news {
		position: relative;
	}

	.class-title {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		padding: 3px 5px;
		color: #dba139;
		background: rgba(0, 0, 0, 0.7);
		text-align: center;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 0.6);
		}
	}
	.img {
		width: 100%;
		height: 110px;
		object-fit: cover;
	}
	.title {
		line-height: 1.2;
	}
	.info {
		font-size: 12px;
		color: #999;
	}

	:deep(.el-carousel) {
		.el-carousel__arrow {
			display: block;
			top: initial;
			bottom: 0px;
			width: 17px;
			height: 17px;
			.el-icon {
				display: none;
			}
			&.el-carousel__arrow--left {
				left: 2px;
				background: url("/@/assets/images/community/arr-left.png");
			}
			&.el-carousel__arrow--right {
				right: 2px;
				background: url("/@/assets/images/community/arr-right.png");
			}
		}
		.el-carousel__indicators--outside {
			button {
				background-color: #d8fefe;
				opacity: 1;
				width: 15px;
				height: 6px;
			}
			// el-carousel__indicator el-carousel__indicator--horizontal is-active
			.is-active {
				button {
					width: 25px;
					background-color: #51c9e4;
				}
			}
		}
	}

	.swiper-button-next {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 17px;
		height: 17px;
		z-index: 98;
		background: url("/@/assets/images/community/arr-left.png") center center
			no-repeat;
		background-size: 100% 100%;
	}
	.swiper-button-prev {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 17px;
		height: 17px;
		z-index: 98;
		background: url("/@/assets/images/community/arr-right.png") center
			center no-repeat;
		background-size: 100% 100%;
	}
}
// 诚议
.argument-list {
	margin: 10px;
	li {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px #0f444a solid;
		padding: 0.5em 0;
		line-height: 1.4;
		align-items: flex-start;
		.date {
			line-height: 1;
		}
	}
}
// amount-box
.amount-box {
	display: flex;
	flex-wrap: wrap;
	li {
		width: calc(50% - 20px);
		margin: 10px;
		padding: 5px 0;
		min-width: 150px;
		background: url("/@/assets/images/community/box2.png") left top
			no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--main-default-color);
		text-align: center;
		.num {
			height: auto;
			line-height: 1;
		}
		small {
			margin-left: 2px;
		}
	}
}

.money-box {
	display: flex;
	flex-wrap: wrap;
	li {
		width: calc(50% - 20px);
		margin: 10px;
		padding-bottom: 30px;
		color: var(--main-default-color);
		text-align: center;
		font-size: 16px;
		.num {
			line-height: 1;
		}
		small {
			margin-left: 2px;
		}
		.title {
			display: block;
		}
	}
}
.plate2 {
	background-size: 115px auto;
	background: url("/@/assets/images/community/plate2.png") center bottom
		no-repeat;
}
.plate3 {
	background-size: 115px auto;
	background: url("/@/assets/images/community/plate3.png") center bottom
		no-repeat;
}
.plate4 {
	background-size: 144px auto;
	background: url("/@/assets/images/community/plate4.png") center bottom
		no-repeat;
}

// 志愿者
.volunteer {
	margin: 10px 5px 0 0;
	.volunteer-title {
		font-size: 16px;
		color: #96f7f7;
	}
	ul {
		margin-top: 5px;
		li {
			display: flex;
			font-size: 12px;
			margin-bottom: 1px;
			.label {
				margin-right: 1px;
				width: 4em;
				min-width: 4em;
				padding: 5px 10px;
				background: #0b2127;
				color: #c8f6f7;
			}
			.content {
				color: #fff;
				flex-grow: 1;
				padding: 5px 10px;
				background: #133139;
				white-space: nowrap; /* 确保文本不会换行 */
				overflow: hidden; /* 超出容器部分的文本隐藏起来 */
				text-overflow: ellipsis; /* 使用省略号表示文本被截断 */
				width: 200px;
			}
		}
	}

	:deep(.el-descriptions) {
		.el-descriptions__body {
			background: none;
		}
		.el-descriptions__header {
			margin-bottom: 2px;
		}
		.el-descriptions__content {
			background: #133139;
			color: #fff;
			border-color: #fff;
		}
		.el-descriptions__title {
			font-size: 16px;
			color: #96f7f7;
		}
		.el-descriptions__label {
			width: 64px;
			border: transparent;
		}
		.el-descriptions__label.el-descriptions__cell.is-bordered-label {
			background: #0b2127;
		}
	}
}
.ranking-title-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.ranking-tag-title {
		font-size: 12px;
		span {
			display: inline-block;
			border-radius: 4px;
			background: #083c41;
			padding: 0 10px;
			line-height: 2;
			margin-left: 5px;
			cursor: pointer;
			&.active {
				color: #c7feff;
				border: 1px #c7feff solid;
			}
			&:hover {
				background: #075b6d;
			}
		}
	}
}
// 排行
.ranking {
	margin-top: 10px;
	.item {
		// margin-bottom: 5px;
		// background: #1ecfa122;
		border-radius: 10px;
		padding: 3px 10px;
		border-bottom: 1px #1ecfa166 solid;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ranking-num {
			width: 24px;
			display: inline-block;
			color: #fff;
			text-align: center;
		}
		.cup-img {
			width: 24px;
			height: 24px;
		}
		.head-img {
			width: 50px;
			height: 50px;
			border-radius: 5px;
			margin-left: 10px;
			margin-right: 10px;
		}
		.error-img {
			width: 50px;
			height: 50px;
			object-fit: contain;
		}
		.title {
			color: #ced7e4;
		}
		.num {
			font-size: 24px;
			height: auto;
			line-height: 1.2;
		}
	}
}
.scroll-main {
	height: calc(100% - 20px);
}
.report-news-card {
	overflow: hidden;
}
//
.report-news {
	li {
		display: flex;
		margin: 10px 0;
		color: #fff;
		.imgbox {
			width: 100px;
			height: 66px;
			padding: 7px;
			margin-right: 10px;
			background: url("/@/assets/images/community/imgbg.png");
			img {
				width: 86px;
				height: 52px;
				display: block;
			}
		}
		.main {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.date {
			margin-left: 5px;
		}
	}
}

// 大屏
@media screen and (max-width: 2268px) {
}
// 正常屏
@media screen and (max-width: 1920px) {
	.screen-page {
	}
}
// 移动端
@media screen and (max-width: 768px) {
	html,
	body,
	#app {
		overflow: auto;
		background-color: #10141a;
	}
	.sm-flex-wrap {
		flex-wrap: wrap;
	}
	.screen-page {
		overflow: auto;
		padding: 0;
		margin: 0;
		.header {
			background-position: top;
			background-size: 130% 100%;
			.date,
			.weather {
				display: none;
			}
			.logo {
				width: 20px;
				height: 20px;
			}
			.screen-title {
				font-size: 20px;
			}
		}
		.main-container {
			overflow: auto;
			flex-wrap: wrap;
			margin-left: 0;
			margin-right: 0;
		}
		.col-left,
		.col-main,
		.col-right {
			height: auto;
			margin-top: 10px;
		}
	}
	.report-news-card {
		height: 300px;
	}
	.question-card {
		height: 400px;
	}
	.argument-card {
		height: 350px;
	}
	.public-news-card {
		flex-direction: column;
	}
	.h5-column {
		flex-direction: column;
	}
	.h5-mt10 {
		margin-top: 10px;
	}
	.h5-mt20 {
		margin-top: 20px;
	}
	.total-box .item {
		flex-basis: 100%;
	}
	.public-card {
		background: none;
		padding: 0;
	}
}
</style>
