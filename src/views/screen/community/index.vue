<template>
	<!-- 社区 -->
	<div class="screen-page flex flex-column" :style="state.pageStyle">
		<!-- 大标题 -->
		<header class="header">
			<div class="flex flex-ai-center flex-jc-center" style="height:60px">
				<img v-if="state.logo" :src="state.logo" class="logo" width="40" height="40" />
				<div class="position-relative">
					<b class="gradient-color screen-title position-relative z-index-up">新津区基层治理{{state.title}}“诚”列馆</b>
					<b class="screen-title title-shadow">新津区基层治理{{state.title}}“诚”列馆</b>
				</div>
			</div>
			<div class="screen-subtitle">真诚待人 真心为民</div>

			<!-- 时间 -->
			<div class="date-bar">
				<div>
					<div class="time">
						<span class="num">{{state.pageDate?.hour}}:{{state.pageDate?.minute}}:{{state.pageDate?.second}}</span>
					</div>
					<div class="date">
						<span class="num">{{state.pageDate?.year}}</span> 年
						<span class="num">{{state.pageDate?.month}}</span> 月
						<span class="num">{{state.pageDate?.day}}</span> 日
					</div>
				</div>
				<span class="week">星期{{state.pageDate?.week}}</span>
			</div>

			<!-- 天气/二维码 -->
			<div class="weather">
				<span class="weather-address">空气质量</span>
				<iframe scrolling="no" :src="state.weatherAddress" style="color: #fff; " frameborder="0" width="100%" height="50" allowtransparency="true"></iframe>
				<div class="qrcode" ref="QRCodeRef"></div>
			</div>
		</header>

		<main class="main-container">
			<!-- 左侧 -->
			<div class="col-left">
				<div class="card about-card">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">{{state.title}}“诚”列史</h2>
							<h2 class="card-title title-shadow">{{state.title}}“诚”列史</h2>
						</div>
					</div>
					<div class="card-body">
						<!-- 图片滚动 -->
						<el-carousel class="about" height="250px" :interval="3000" arrow="always" v-if="state.introduce.picture?.length">
							<el-carousel-item v-for="(item, index) in state.introduce.picture" :key="index">
								<img class="img" :data-img="item" :data-loading="true" style="width:100%;height: 100%; object-fit:cover" @click="showViewer(state.introduce.picture)" />
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
				<div class="card mt20 report-news-card flex-grow" v-if="!($isMobile && !state.reportListData.length)">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">{{state.title}}“诚”报</h2>
							<h2 class="card-title title-shadow">{{state.title}}“诚”报</h2>
						</div>
						<div>
							<a class="more" href="javascript:;" @click="openTableDialog(state.tableConfig.reportListData,`${state.title}“诚”报`,{})">更多</a>
						</div>
					</div>
					<div class="card-body">
						<vue3-seamless-scroll ref="reportNewsRef" :list="state.reportListData" :singleHeight="0" :step="0.5" :hover="true" :limitScrollNum="3" class="seamless-wrap">
							<ul class="report-news">
								<li v-for="(item,index) in state.reportListData" :key="index">
									<el-image fit="cover" class="imgbox" :src="item.thumb" :preview-src-list="[item.thumb]" :preview-teleported="true">
										<template #error>
											<img src="/@/assets/images/community/nonews.jpg" class="error-img" />
										</template>
									</el-image>
									<div class="main">
										<p class="title ellipsis-2" @click="openDetail(state.tableConfig.reportListData, item, `${state.title}“诚”报`)">{{item.xiangguanneirong}}</p>
										<p>
											<el-text type="warning" size="small">[{{item.leixing}}]</el-text>
											<br />
											<el-text type="info" class="date" size="small">时间：</el-text>
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
				<div class="public-card flex-grow">
					<div class="card-header">
						<div class="position-relative title-bg">
							<h2 class="card-title position-relative z-index-up">开“诚”布公</h2>
							<h2 class="card-title title-shadow">开“诚”布公</h2>
						</div>
					</div>
					<div class="card-body">
						<div class="total-box">
							<div class="item">
								<p class="num gradient-color">{{state.economyTotal?.incomeTotal}}</p>总收入
								<small>(元)</small>
							</div>
							<div class="item">
								<p class="num gradient-color">{{state.economyTotal?.expensesTotal}}</p>总支出
								<small>(元)</small>
							</div>
							<div class="item">
								<p class="num gradient-color">{{state.economyTotal?.balance}}</p>余额
								<small>(元)</small>
							</div>
						</div>
						<!--  -->
						<el-carousel height="140px" :interval="5000" :autoplay="true" arrow="always" indicator-position="none" trigger="click" v-if="state.economyItemData?.length">
							<el-carousel-item v-for="(itemGroup,groupIndex) in state.economyItemData" :key="groupIndex">
								<div class="company-box">
									<div class="item" v-for="(item,index) in itemGroup" :key="index">
										<p class="gradient-color-2 center ellipsis">{{item.accountType}}</p>
										<ul v-if="item.type==1">
											<!-- <li
											@click=""
											>-->
											<li @click="openEconomyDialog(1, item.accountType, '收入')">
												<span>收入金额</span>
												<span>
													<em>{{item.incomeTotal}}</em>元
												</span>
											</li>
											<li @click="openEconomyDialog(1, item.accountType, '支出')">
												<span>支出金额</span>
												<span>
													<em>{{item.expensesTotal}}</em>元
												</span>
											</li>
											<li @click="openEconomyDialog(1, item.accountType)">
												<span>余 额</span>
												<span>
													<em>{{item.balance}}</em>元
												</span>
											</li>
										</ul>
										<ul v-if="item.type==2">
											<li @click="openEconomyDialog(2, item.accountType)">
												<span>入股户数</span>
												<span>
													<em>{{item.num}}</em>户
												</span>
											</li>
											<li @click="openEconomyDialog(2, item.accountType)">
												<span>入股金额</span>
												<span>
													<em>{{item.amount}}</em>元
												</span>
											</li>
											<li @click="openEconomyDialog(2, item.accountType )">
												<span>余 额</span>
												<span>
													<em>{{item.balance}}</em>元
												</span>
											</li>
										</ul>
									</div>
								</div>
							</el-carousel-item>
						</el-carousel>
						<!-- compnay-box end -->
						<div class="public-news-card flex-grow">
							<!-- 党务 -->
							<div class="public-news-box">
								<el-carousel height="160px" :autoplay="true" :interval="3000" arrow="always" indicator-position="outside" v-if="state.openList1?.length">
									<div
										class="class-title"
										@click="openTableDialog(state.tableConfig.openInfoList,'党务公开',{conditions:[{'fieldName': 'gongkaileixing',
      'condition': 0,'fieldValue': '党务','isValueField': true}]})"
									>党务公开</div>
									<el-carousel-item v-for="(item,index) in state.openList1" :key="index">
										<div class="news">
											<!-- <img class="img" :src="item.thumb" @click="showViewer(item.xinxifujian)" /> -->
											<el-image fit="cover" class="img" :src="item.thumb" lazy :preview-src-list="item.xinxifujian" :preview-teleported="true">
												<template #error>
													<img src="/@/assets/images/community/nonews.jpg" class="error-img" />
												</template>
											</el-image>
											<div class="text-box">
												<p class="title ellipsis-2" @click="openDetail(state.tableConfig.openInfoList, item,'党务公开')">{{item.xinxibiaoti}}</p>
												<p class="info">{{item.gongkaishijian}}</p>
											</div>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
							<!-- 财务 -->
							<div class="public-news-box">
								<el-carousel height="160px" :autoplay="true" :interval="3000" arrow="always" indicator-position="outside" v-if="state.openList2?.length">
									<div
										class="class-title"
										@click="openTableDialog(state.tableConfig.openInfoList,'财务公开',{conditions:[{'fieldName': 'gongkaileixing',
      'condition': 0,'fieldValue': '财务','isValueField': true}]})"
									>财务公开</div>
									<el-carousel-item v-for="(item,index) in state.openList2" :key="index">
										<div class="news">
											<el-image fit="cover" class="img" :src="item.thumb" lazy :preview-src-list="item.xinxifujian" :preview-teleported="true">
												<template #error>
													<img src="/@/assets/images/community/nonews.jpg" class="error-img" />
												</template>
											</el-image>
											<div>
												<p class="title ellipsis-2" @click="openDetail(state.tableConfig.openInfoList, item,'财务公开')">{{item.xinxibiaoti}}</p>
												<p class="info">{{item.gongkaishijian}}</p>
											</div>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
							<!-- 村务 -->
							<div class="public-news-box">
								<el-carousel height="160px" :autoplay="true" :interval="3000" arrow="always" indicator-position="outside" v-if="state.openList3?.length">
									<div
										class="class-title"
										@click="openTableDialog(state.tableConfig.openInfoList,'村务公开',{conditions:[{'fieldName': 'gongkaileixing',
      'condition': 0,'fieldValue': '村务','isValueField': true}]})"
									>村务公开</div>
									<el-carousel-item v-for="(item,index) in state.openList3" :key="index">
										<div class="news">
											<el-image fit="cover" class="img" :src="item.thumb" lazy loading="lazy" :preview-src-list="item.xinxifujian" :preview-teleported="true">
												<template #error>
													<img src="/@/assets/images/community/nonews.jpg" class="error-img" />
												</template>
											</el-image>
											<div>
												<p class="title ellipsis-2" @click="openDetail(state.tableConfig.openInfoList, item,'村务公开')">{{item.xinxibiaoti}}</p>
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
				<div class="card mt20 flex-grow overflow-hidden argument-card" v-if="!($isMobile && !state.argumentListData.length)">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">民事“诚”议</h2>
							<h2 class="card-title title-shadow">民事“诚”议</h2>
						</div>
						<div>
							<a class="more" href="javascript:;" @click="openTableDialog(state.tableConfig.argumentList,`民事“诚”议`,{})">更多</a>
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
										<p class="title ellipsis-2" @click="openDetail(state.tableConfig.argumentList, item,`民事“诚”议`)">{{item.yiti}}</p>
										<el-text class="date" type="info" size="small">{{item.fabushijian}}</el-text>
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
				<div class="card money-card">
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
								<el-carousel height="178px" :autoplay="true" :interval="3000" arrow="always" indicator-position="none" v-if="state.volunteerList?.length">
									<el-carousel-item v-for="(item,index) in state.volunteerList" :key="index">
										<ul @click="openTableDialog(state.tableConfig.volunteerList,'志愿者队伍',{})">
											<li>
												<span class="label">队伍名称</span>
												<div class="content">
													<el-tooltip effect="dark" :content="item.duiwumingcheng" placement="top-start">{{item.duiwumingcheng}}</el-tooltip>
												</div>
											</li>
											<li>
												<span class="label">队伍组成</span>
												<div class="content ellipsis">
													<el-tooltip effect="dark" :content="item.duiwuzucheng" placement="top-start">{{item.duiwuzucheng}}</el-tooltip>
												</div>
											</li>
											<li>
												<span class="label">服务内容</span>
												<div class="content ellipsis-5">
													<el-tooltip effect="dark" :content="item.fuwuneirong" placement="top-start">{{item.fuwuneirong}}</el-tooltip>
												</div>
											</li>
										</ul>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<!-- 排行 -->
						<div class="flex flex-column h5-mt20" style="min-width: 210px">
							<!-- 排行标题 -->
							<div class="ranking-title-bar">
								积分
								<div class="ranking-tag-title">
									<span :class="state.rankingTag == '总排行' ? 'active' : ''" @click="clickRankingTag('总排行')">总排行</span>
									<span :class="state.rankingTag == '月排行' ? 'active' : ''" @click="clickRankingTag('月排行')">月排行</span>
								</div>
							</div>
							<!-- 排行列表 -->
							<!-- 前三名 -->
							<div class="ranking" @mouseover="stopChangeRanking" @mouseleave="autoChangeRanking">
								<div class="item" v-for="(item,index) in state.rankingTop" :key="index">
									<span class="flex flex-ai-center title">
										<el-image :src="item['icon']" fit="contain" class="cup-img"></el-image>
										<el-image fit="contain" class="head-img" :src="item.headPortrait" lazy :preview-src-list="[item.headPortrait]" :preview-teleported="true">
											<template #error>
												<img src="/@/assets/images/community/nohead.png" class="error-img" />
											</template>
										</el-image>
										{{item.name}}
									</span>
									<span class="num" @click="openRankingDialog(item.name)">{{item.total}}</span>
								</div>
							</div>
							<!-- 前三名后续 -->
							<div class="flex-grow" style="height: 210px">
								<vue3-seamless-scroll ref="rankingRef" :list="state.rankingOther" :singleHeight="0" :step="0.3" :hover="true" :limitScrollNum="5" class="seamless-wrap">
									<div class="ranking">
										<div class="item" v-for="(item,index) in state.rankingOther" :key="index">
											<span class="flex flex-ai-center title">
												<el-text class="ranking-num">{{index+4}}</el-text>
												<el-image fit="contain" class="head-img" :src="item.headPortrait" lazy :preview-src-list="[item.headPortrait]" :preview-teleported="true">
													<template #error>
														<img src="/@/assets/images/community/nohead.png" class="error-img" />
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
				<div class="card mt20 flex-grow question-card" v-if="!($isMobile && !state.questionListData.length)">
					<div class="card-header">
						<div class="position-relative">
							<h2 class="card-title position-relative z-index-up">“诚”心言事口</h2>
							<h2 class="card-title title-shadow">“诚”心言事口</h2>
						</div>
						<div>
							<a class="more" href="javascript:;" @click="openQuestionFrom()">我要发言</a>
							<a class="more" href="javascript:;" @click="openTableDialog(state.tableConfig.questionList,'“诚”心言事口',{})">更多</a>
						</div>
					</div>
					<div class="card-body">
						<vue3-seamless-scroll ref="questionRef" :list="state.questionListData" :singleHeight="0" :step="0.5" :hover="true" :limitScrollNum="3" class="seamless-wrap">
							<ul class="question-list">
								<li v-for="(item,index) in state.questionListData" :key="index" @click="openDetail(state.tableConfig.questionList, item,'“诚”心言事口')">
									<img class="icon" src="/@/assets/images/community/icon-news.png" />
									<div class="main">
										<div class="title ellipsis-2">{{item.wentineirong}}</div>
										<div class="date">{{item.CreateTime.split(" ")[0]}}</div>
										<p class="replay" v-if="item.huifuneirong?.length > 0">回复：{{item.huifuneirong}}</p>
										<el-text type="danger" size="small" v-if="item.huifuneirong?.length < 1">[未回复]</el-text>
									</div>
								</li>
							</ul>
						</vue3-seamless-scroll>
					</div>
				</div>
			</div>
		</main>
	</div>

	<!-- 图片预览组件 -->
	<el-image-viewer v-if="state.isViewer" :urlList="state.pics" @close="closeViewer" :zIndex="9999"></el-image-viewer>
	<!-- 列表 -->
	<TableDialog ref="tableDialogRef"></TableDialog>
	<!-- 详情 -->
	<DetailDialog ref="detailDialogRef"></DetailDialog>
	<!-- 发起质疑 -->
	<QuestionFormDialog ref="questionFormDialogRef" @updateQuestion="updateQuestion"></QuestionFormDialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { getAPI } from "/@/utils/request";
import QRCode from "qrcodejs2-fixes";
import { LargeScreenApi, WeatherApi } from "/@/api/sysApi";
import { isMobile, lazyImg } from "/@/utils/other";
import getColumnType, {
	getFirstImg,
	transformUploadData,
} from "/@/utils/columnType";

import TableDialog from "../component/tableDialog.vue";
import DetailDialog from "../component/detailDialog.vue";
import QuestionFormDialog from "../component/questionFormDialog.vue";

const route = useRoute();
const questionRef = ref(null);
const reportNewsRef = ref(null);
const questionFormDialogRef = ref(null);
const tableDialogRef = ref(null);
const detailDialogRef = ref(null);
const QRCodeRef = ref(null);
const $isMobile = isMobile();

import rankTop1 from "/@/assets/images/community/rank_top1.png";
import rankTop2 from "/@/assets/images/community/rank_top2.png";
import rankTop3 from "/@/assets/images/community/rank_top3.png";
import chengImg from "/@/assets/images/cheng.png";
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
	id: "" as String | Number, //大屏ID
	title: "" as String, //大屏标题
	logo: "" as any, //大屏LOGO
	pageStyle: "" as String, //大屏等比例样式
	weatherAddress: "" as String, //天气地址
	isViewer: false, //图片预览
	pics: [],
	//表配置
	tableConfig: {} as any,
	//时钟
	pageDate: {
		year: "0000",
		month: "00",
		day: "00",
		hour: "00",
		minute: "00",
		second: "00",
		week: "",
	},
	//诚列史
	introduce: {
		square: 0,
		households: 0,
		peopleNum: 0,
		partyMemberNum: 0,
		situation: "",
		history: "",
		picture: [],
	},
	//集体经济
	economyTotal: economyTotal as any,
	economyItemData: [] as any,
	//诚报
	reportListData: [] as Array<any>,
	//诚议
	argumentAmount: argumentAmount as any,
	argumentListData: [] as Array<any>,
	//诚议币统计
	inergralTotal: inergralTotal as any,
	//排行
	rankingTableId: undefined,
	rankingTimer: null,
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
	//言事口
	questionListData: [] as Array<any>,
});
onMounted(() => {
	state.id = route.query?.id ?? "";
	//非移动端按比例显示
	if (!$isMobile) {
		initScreen();
		window.addEventListener("resize", () => {
			initScreen();
		});
	}
	//二维码
	initQrcode();
	//诚列史
	getIntroduce();
	//集体经济
	getEconomyTotal();
	getEconomyItemData();
	//时钟
	getPageDate();
	//诚议币
	getIntegralTotal();
	//诚报
	getReportList();
	//言事口
	questionsAndAnswersList();
	//排行
	getTotalRanking();
	getMonthRanking();
	autoChangeRanking();
	//诚议
	getArgumentAmount();
	getArgumentList();
	//三务
	getOpenList("党务");
	getOpenList("财务");
	getOpenList("村务");
	// lazyImg(".public-news-box .img");
	//志愿者
	getVolunteerList();
});

//诚列史
const getIntroduce = async () => {
	const { data } = await getAPI(LargeScreenApi).introduce({
		id: state.id,
	});
	let tmp = data.result ?? {};
	tmp.picture = transformUploadData(tmp.picture);
	state.introduce = tmp;
	state.title = tmp.communityName;

	lazyImg(".about .img", tmp.picture);
	//meta-title
	document.title = `${state.title}`;
	state.weatherAddress = `https://widget.tianqiapi.com?style=tg&skin=pitaya&city=新津&color=fff`;
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
	state.tableConfig.openInfoList.columns =
		state.tableConfig.openInfoList.columns.filter(
			(item: any) => item.type !== 1
		);
	tmp = tmp.map((item: any) => {
		item.xinxifujian = transformUploadData(item.xinxifujian);
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

//诚议币总计
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
	let tmp = data.result?.list?.items ?? [];
	tmp = tmp.map((item: any) => {
		item.xiangguantupian = transformUploadData(item.xiangguantupian);
		item.thumb = item.xiangguantupian[0];
		return item;
	});
	state.reportListData = tmp;
	state.tableConfig.reportListData = data.result.tableColumns;
	state.tableConfig.reportListData.columns =
		state.tableConfig.reportListData.columns.filter(
			(item: any) => item.type !== 1
		);
};
//言事口
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
	state.tableConfig.questionList.columns =
		state.tableConfig.questionList.columns.filter(
			(item: any) => item.type !== 1
		);
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
	state.tableConfig.argumentList.columns =
		state.tableConfig.argumentList.columns.filter(
			(item: any) => item.type !== 1
		);
};

// 开诚布公集体经济
const getEconomyTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).economyTotal({
		id: state.id,
	});
	state.economyTotal = data.result ?? {};
};
const getEconomyItemData = async () => {
	let groupSize = 4;
	if ($isMobile) groupSize = 2;
	//type:1日常、2入股
	const { data } = await getAPI(LargeScreenApi).economyItemData({
		id: state.id,
	});
	let tmp = data.result?.economys ?? [];

	const economyItemData = [];
	for (let i = 0; i < tmp.length; i += groupSize) {
		economyItemData.push(tmp.slice(i, i + groupSize));
	}
	// tmp = tmp.slice(0, 10);
	state.economyItemData = economyItemData;
	state.tableConfig.equities = data.result.equitiesTableColumns;
	state.tableConfig.daily = data.result.dailyTableColumns;
};
//志愿者
const getVolunteerList = async () => {
	const { data } = await getAPI(LargeScreenApi).volunteerList({
		id: state.id,
		page: 1,
		pageSize: 10,
	});
	let tmp = data.result?.list?.items ?? [];
	state.volunteerList = tmp;
	state.tableConfig.volunteerList = data.result.tableColumns;
	state.tableConfig.volunteerList.columns =
		state.tableConfig.volunteerList.columns.filter(
			(item: any) => item.type !== 1
		);
};
//总排行
const getTotalRanking = async () => {
	const { data } = await getAPI(LargeScreenApi).overallRanking({
		id: state.id,
		page: 1,
		pageSize: 10,
	});
	let tmp = data.result?.rankings ?? [];
	tmp = tmp.map((item: any, index: number) => {
		item.icon = icons[index];
		item.headPortrait = getFirstImg(item.headPortrait);
		return item;
	});
	state.rankingTableId = data.result.tableId;
	state.totalRankingTop = tmp.slice(0, 3);
	state.totalRankingOther = tmp.slice(3, 10);
	state.rankingTop = state.totalRankingTop;
	state.rankingOther = state.totalRankingOther;
};
//月排行
const getMonthRanking = async () => {
	const { data } = await getAPI(LargeScreenApi).rankingByMonth({
		id: state.id,
		page: 1,
		pageSize: 10,
	});
	let tmp = data.result?.rankings ?? [];
	tmp = tmp.map((item: any, index: number) => {
		item.icon = icons[index];
		item.headPortrait = getFirstImg(item.headPortrait);
		return item;
	});
	state.monthRankingTop = tmp.slice(0, 3);
	state.monthRankingOther = tmp.slice(3, 10);
};

const stopChangeRanking = () => {
	clearInterval(state.rankingTimer);
};
//自动切换排行
const autoChangeRanking = () => {
	state.rankingTimer = setInterval(() => {
		let tag = state.rankingTag;
		tag = tag == "总排行" ? "月排行" : "总排行";
		clickRankingTag(tag);
	}, 15000);
};
//切换排行
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
//经济子项
const openEconomyDialog = (type: number, title: string, inOrOut?: string) => {
	//表配置
	let tableId, columns;
	if (type == 1) {
		tableId = state.tableConfig.daily.tableId;
		columns = state.tableConfig.daily.columns;
	} else {
		tableId = state.tableConfig.equities.tableId;
		columns = state.tableConfig.equities.columns;
	}
	let tableConfig = {
		id: state.id,
		tableId,
		columns,
	};
	//参数配置
	let tableParams = {
		id: state.id,
		conditions: [
			{
				fieldName: "jitijingjileixing",
				condition: 0,
				fieldValue: title,
				isValueField: true,
			},
		],
	};
	if (inOrOut) {
		tableParams.conditions.push({
			fieldName: "leixing",
			condition: 0,
			fieldValue: inOrOut,
			isValueField: true,
		});
	}

	tableDialogRef?.value.openDialog(tableConfig, title, tableParams);
};
//打开排行人员积分列表
const openRankingDialog = (userName: string) => {
	let tableParams = { id: state.id };
	let tableConfig = {
		id: state.id,
		tableId: state.rankingTableId,
	};
	tableDialogRef?.value.openDialog(tableConfig, userName, tableParams);
};
//列表弹窗
const openTableDialog = (
	tableConfig: any,
	title: String,
	tableParams?: Object | undefined
) => {
	if (tableConfig) {
		if (tableParams) {
			tableParams.id = state.id;
		}
		tableDialogRef?.value.openDialog(tableConfig, title, tableParams);
	}
};
//详情弹窗
const openDetail = (tableConfig: any, row: any, pageTitle?: string) => {
	if (tableConfig)
		detailDialogRef?.value.openDialog(tableConfig, row, pageTitle);
};
//我要发言
const openQuestionFrom = () => {
	questionFormDialogRef.value?.openDialog(
		state.tableConfig.questionList,
		state.id
	);
};
const updateQuestion = () => {
	questionsAndAnswersList();
};
const showViewer = (pic: any) => {
	state.pics = pic;
	state.isViewer = true;
};
const closeViewer = () => {
	state.isViewer = false;
	state.pics = [];
};
// 大屏按contain显示
const initScreen = () => {
	//基准宽高
	let baseWidth = 1920;
	let baseHeight = 1080;
	//基准宽高比例
	let ratio = baseWidth / baseHeight;
	//基准缩放比例
	let scale = 1;
	//当前可视宽高
	let viewWidth = window.innerWidth;
	let viewHeight = window.innerHeight;
	// 宽大于高(以高为标准,否则以宽为准)
	let pageHeight = 0;
	let pageWidth = 0;
	if (viewWidth / viewHeight > ratio) {
		pageHeight = viewHeight;
		pageWidth = (baseWidth * pageHeight) / baseHeight;
		scale = pageWidth / baseWidth;
	} else {
		pageWidth = viewWidth;
		pageHeight = (pageWidth * baseHeight) / baseWidth;
		scale = pageHeight / baseHeight;
	}
	//按比例缩放
	let width = baseWidth;
	let height = baseHeight;
	let left = (viewWidth - baseWidth) / 2;
	let top = (viewHeight - baseHeight) / 2;
	let cale = scale;
	// 指定宽度在区域内不按比例设置
	if ((viewWidth < 2000) & (viewWidth >= 1920)) {
		if (scale != 1) {
			state.pageStyle = "";
		}
		return;
	}
	state.pageStyle = `position:absolute; width:${width}px;height:${height}px;transform:scale(${scale});top:${top}px;left:${left}px;`;
};

//二维码
const initQrcode = async () => {
	const qrUrl = window.location.href;
	const qrCode = new QRCode(QRCodeRef.value, {
		text: `${encodeURI(qrUrl)}`,
		width: 60,
		height: 60,
		colorDark: "#000",
		colorLight: "#ffffff",
	});
	const logoImage = chengImg;
	if (logoImage) {
		let logo = new Image();
		logo.setAttribute("corssOrigin", "Anonymous");
		logo.src = logoImage;
		logo.onload = () => {
			let qrImg = qrCode._el.getElementsByTagName("img")[0];
			let canvas = qrCode._el.getElementsByTagName("canvas")[0];
			let ctx = canvas.getContext("2d");
			ctx.drawImage(logo, 20, 20, 20, 20);
			qrImg.src = canvas.toDataURL();
			// qrImg.style.display = "none";
			// canvas.style.display = "block";
		};
	}
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
			week: "日一二三四五六".split("")[now.getDay()],
		};
		state.pageDate = { ...date };
	}, 1000);
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
body {
	background: url("/@/assets/images/community/bg.jpg");
	background-size: 100% 100%;
	background-color: #123f53;
}
</style>
<style lang="scss" scoped>
div {
	box-sizing: border-box;
}
// 大屏容器
.screen-page {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background: url("/@/assets/images/community/bg.jpg");
	background-size: 100% 100%;
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

.ellipsis {
	white-space: nowrap; /* 确保文本不会换行 */
	overflow: hidden; /* 超出容器部分的文本隐藏起来 */
	text-overflow: ellipsis; /* 使用省略号表示文本被截断 */
}

.ellipsis-1 {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.ellipsis-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.ellipsis-5 {
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
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
		margin-top: 7px;
		font-size: 16px;
		font-weight: bold;
		color: var(--main-sub-color);
		word-spacing: 10px;
		letter-spacing: 3px;
		background-image: linear-gradient(
			to bottom,
			#fff,
			var(--main-primary-color)
		);
		color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		animation: screenSubTitleAnimation 5s infinite;
	}
	.date-bar {
		position: absolute;
		top: 20px;
		left: 30px;
		color: var(--main-primary-color);
		text-align: left;
		display: flex;
		align-items: center;
		color: #fff;
		& > div {
			border-right: 1px #999 dotted;
			padding-right: 10px;
		}
		.date {
			font-size: 18px;
			.num {
				line-height: 1;
				font-size: 20px;
			}
		}
		.time {
			text-align: center;
			.num {
				line-height: 1;
				color: #dba139;
			}
		}
		.week {
			margin-left: 10px;
		}
	}
	.weather {
		position: absolute;
		top: 20px;
		right: 30px;
		display: flex;
		align-items: center;
		.weather-address {
			position: absolute;
			top: 8px;
			left: 0;
			width: 110px;
			text-align: center;
			background: #10141a;
			border-radius: 10px;
			color: #fff;
		}
	}
	.qrcode {
		border: 3px #fff solid;
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

//诚列史
.about-card,
.money-card {
	height: 488px;
}
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
	background: #000a;
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
		font-size: 28px;
	}
}
//言事口
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

	:deep(.el-carousel) {
		.el-carousel__arrow {
			background-color: #fff2;
			&:hover {
				background-color: #27acc677;
			}
		}
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
		max-width: 33%;
		padding: 10px 2%;
		flex-grow: 1;
		margin: 0 10px auto 10px;
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
	width: calc(33.33% - 20px);
	flex-grow: 1;
	padding: 10px;
	margin: 10px 10px 0 10px;
	background: rgba(9, 21, 25, 0.4);
	.news {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.class-title {
		position: absolute;
		z-index: 2;
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
		flex-grow: 1;
		object-fit: cover;
		margin-bottom: 5px;
		img {
			height: 100%;
		}
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
.argument-card {
	max-height: 305px;
}
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
	background-size: 100% auto;
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
	:deep(.el-carousel) {
		.el-carousel__arrow {
			background-color: #fff2;
			&:hover {
				background-color: #27acc677;
			}
		}
	}
	ul {
		margin-top: 5px;
		li {
			display: flex;
			font-size: 12px;
			margin-bottom: 1px;
			overflow: hidden;
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

				width: 200px;
			}
			&:last-child {
				.content {
					overflow: initial;
					white-space: normal;
					text-overflow: initial;
				}
			}
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
			width: 32px;
			display: inline-block;
			color: #fff;
			text-align: center;
		}
		.cup-img {
			width: 32px;
			height: 32px;
		}
		.head-img {
			width: 50px;
			height: 50px;
			border-radius: 5px;
			margin-left: 5px;
			margin-right: 5px;
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
.report-news {
	li {
		display: flex;
		margin: 10px 0;
		color: #fff;
		.imgbox {
			flex-shrink: 0;
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

@keyframes screenSubTitleAnimation {
	0% {
		transform: scale(1);
	}
	10% {
		transform: scale(1.2);
	}
	20% {
		transform: scale(1);
	}
	100% {
		transform: scale(1);
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
			.date-bar,
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
		max-height: 450px;
		height: 450px;
	}
	.company-box {
		.item {
			max-width: calc(50% - 20px);
		}
	}
	.public-news-card {
		flex-direction: column;
	}
	.public-news-box {
		width: calc(100% - 20px);
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
		padding-bottom: 60px;
	}
	.public-card {
		background: none;
		padding: 0;
	}
}
</style>
