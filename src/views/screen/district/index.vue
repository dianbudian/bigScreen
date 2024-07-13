<template>
	<!-- 区级 -->
	<div class="screen-page" :style="state.pageStyle">
		<!-- 大标题 -->
		<header class="header">
			<div class="flex flex-ai-center flex-jc-center" style="height:60px">
				<div class="position-relative">
					<b class="gradient-color screen-title position-relative z-index-up">新津区基层治理“诚”列馆</b>
					<b class="screen-title title-shadow">新津区基层治理“诚”列馆</b>
				</div>
			</div>
			<div class="screen-subtitle">真诚待人 真心为民</div>
		</header>

		<!-- 已选社区 -->
		<div class="community-card">
			<div class="circle"></div>
			<!-- <div class="marktip"><img class="arr" src="/@/assets/images/district/marktip.png" /></div> -->
			<ul class="village">
				<li v-for="(item,index) in state.villageList" :key="index" :class="getClassName(item.checked,item.active)" :style="'transform: rotate('+ item.rotate +');'" @click="goVillageRotate(index,true)">
					<b>{{item.title}}</b>
					<img class="arr animate-flash" src="/@/assets/images/district/street_arrow.png" />
				</li>
			</ul>
		</div>

		<!-- 街镇 -->
		<div class="street-board">
			<div class="street-center">
				<img class="moon" src="/@/assets/images/district/moon.png" />
				<b @click="goDistrictTotal()" :class="state.id===0?'active':''">新津区</b>
			</div>
			<div
				v-for="(item,index) in state.streetList"
				:key="index"
				:class="item.checked ? 'item checked': 'item'"
				:style="'transform: rotate('+ item.rotate +');opacity:'+item.opacity"
				@click="goStreetRotate(index, true)"
			>
				<b>{{item.title}}</b>
				<img class="arr animate-flash" src="/@/assets/images/district/street_arrow.png" />
			</div>
		</div>

		<!-- 内容 -->
		<div class="content-box" :style="state.id===0?'left:630px;':''">
			<!-- 数据区 -->
			<div class="data-card">
				<div class="card">
					<div class="card-title">
						<b>{{state.boardShortTitle}}“诚”列史</b>
					</div>
					<div class="card-main">
						<ul class="card-databar">
							<li>
								<p>
									<span class="num">{{state.introduce?.square ?? '--'}}</span>
								</p>
								<span class="title">面积（平方公里）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.introduce?.households ?? '--'}}</span>
								</p>
								<span class="title">户数（户）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.introduce?.peopleNum ?? '--'}}</span>
								</p>
								<span class="title">人数（人）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.introduce?.partyMemberNum ?? '--'}}</span>
								</p>
								<span class="title">党员（人）</span>
							</li>
						</ul>
					</div>
				</div>
				<!--  -->
				<div class="card question-card">
					<div class="card-title">
						<b>开“诚”布公</b>
					</div>
					<div class="card-main">
						<ul class="card-databar">
							<li>
								<p>
									<span class="num">{{state.economyTotal?.incomeTotal ?? '--'}}</span>
								</p>
								<span class="title">集体经济总收入（万元）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.economyTotal?.expensesTotal ?? '--'}}</span>
								</p>
								<span class="title">集体经济总支出（万元）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.economyTotal?.balance ?? '--'}}</span>
								</p>
								<span class="title">集体经济总余额（万元）</span>
							</li>
						</ul>
					</div>
					<div class="card-main">
						<ul class="card-databar flex-databar">
							<li>
								<span class="title">党务公开</span>
								<p>
									<span class="num">{{state.openInfoTotal?.partyAffairsTotal ?? '--'}}</span>
									<small>个</small>
								</p>
							</li>
							<li>
								<span class="title">村务公开</span>
								<p>
									<span class="num">{{state.openInfoTotal?.villageAffairsTotal ?? '--'}}</span>
									<small>个</small>
								</p>
							</li>
							<li>
								<span class="title">财务公开</span>
								<p>
									<span class="num">{{state.openInfoTotal?.financeTotal ?? '--'}}</span>
									<small>个</small>
								</p>
							</li>
						</ul>
					</div>
				</div>
				<!--  -->
				<div class="card">
					<div class="card-title">
						<b>信义“诚”折</b>
					</div>
					<div class="card-main">
						<ul class="card-databar">
							<li>
								<p>
									<span class="num">{{state.inergralTotal?.volunteerTotal ?? '--'}}</span>
								</p>
								<span class="title">志愿者总数（人）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.inergralTotal?.durationTotal ?? '--'}}</span>
								</p>
								<span class="title">服务时长 （小时）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.inergralTotal?.incomeTotal ?? '--'}}</span>
								</p>
								<span class="title">存积分（分）</span>
							</li>
							<li>
								<p>
									<span class="num">{{state.inergralTotal?.expensesTotal ?? '--'}}</span>
								</p>
								<span class="title">享积分（分）</span>
							</li>
						</ul>
					</div>
				</div>
				<!--  -->
				<div class="card question-card">
					<div class="card-title">
						<b>诚”心言事口</b>
					</div>
					<div class="card-main">
						<ul class="card-databar flex-databar">
							<li>
								<span class="title">群众问题</span>
								<p>
									<span class="num">{{state.questionTotal?.questionTotal ?? '--'}}</span>
									<small>条</small>
								</p>
							</li>
							<li>
								<span class="title">社区回答</span>
								<p>
									<span class="num">{{state.questionTotal?.answerTotal ?? '--'}}</span>
									<small>条</small>
								</p>
							</li>
							<li>
								<span class="title">暂未回复</span>
								<p>
									<span class="num">{{state.questionTotal?.noAnswerTotal ?? '--'}}</span>
									<small>条</small>
								</p>
							</li>
						</ul>
					</div>
				</div>
				<!--  -->
				<div class="card question-card">
					<div class="card-title">
						<b>民事“诚”议</b>
					</div>
					<div class="card-main">
						<ul class="card-databar flex-databar">
							<li>
								<span class="title">发布议题</span>
								<p>
									<span class="num">{{state.argumentAmount?.topicsTotal ?? '--'}}</span>
									<small>个</small>
								</p>
							</li>
							<li>
								<span class="title">召开会议</span>
								<p>
									<span class="num">{{state.argumentAmount?.meetingTotal ?? '--'}}</span>
									<small>场</small>
								</p>
							</li>
							<li>
								<span class="title">议决事项</span>
								<p>
									<span class="num">{{state.argumentAmount?.matterTotal ?? '--'}}</span>
									<small>项</small>
								</p>
							</li>
							<li>
								<span class="title">参与议事人员</span>
								<p>
									<span class="num">{{state.argumentAmount?.personTotal ?? '--'}}</span>
									<small>人</small>
								</p>
							</li>
						</ul>
					</div>
				</div>
				<!--  -->
				<div class="card question-card">
					<div class="card-title">
						<b>{{state.boardShortTitle}}“诚”报</b>
					</div>
					<div class="card-main">
						<!-- <div class="side-icon"></div> -->
						<ul class="card-databar flex-databar">
							<li>
								<span class="title">分类数量</span>
								<p>
									<span class="num">{{state.reportTotal.categoryTotal}}</span>
									<small>个</small>
								</p>
							</li>
							<li>
								<span class="title">总数量</span>
								<p>
									<span class="num">{{state.reportTotal.total}}</span>
									<small>条</small>
								</p>
							</li>
						</ul>
					</div>
				</div>

				<!-- 区级统计 -->
				<div class="card">
					<div class="card-top">
						<span style="color: #f30; margin-right:3px;">※</span> 以上为已开通社区数据统计
					</div>
				</div>
			</div>
			<!-- 功能区 -->
			<div class="function-card">
				<div>
					<h2 class="function-card-title">{{state.boardTitle}}</h2>
					<div class="qr-code-box">
						<div v-if="state.checkedVillage?.active" class="qrcode" ref="QRCodeRef"></div>
						<template v-else>
							<div v-if="state.checkedVillage?.active===false" class="empty" style="color: #fff; margin-top:50px;">未开通</div>
							<div class="circle" v-else>
								<img class="moon" src="/@/assets/images/district/moon.png" />
							</div>
						</template>
					</div>

					<ul class="amount" v-if="!state.checkedVillage?.id">
						<li v-if="state.districtTotal?.streetCount">
							<p>
								<span class="num">{{state.districtTotal.streetCount}}</span>
								<small>个街道</small>
							</p>
						</li>
						<li>
							<p>
								<span class="num">{{state.districtTotal.communityCount}}</span>
								<small>个社区</small>
							</p>
						</li>
						<li>
							<p>
								<span class="num">{{state.districtTotal.openCount}}</span>
								<small>个已开通社区</small>
							</p>
						</li>
					</ul>
				</div>

				<div>
					<div class="btn" @click="goCommuinty()" v-if="state.checkedVillage?.id">
						<img src="/@/assets/images/district/btn-view.png" />
						<b>查 看</b>
					</div>
					<div class="btn" @click="clearCache()">
						<img class="animat-btn-rotate" src="/@/assets/images/district/btn-clear.png" />
						<b>刷 新</b>
					</div>
				</div>
			</div>
		</div>

		<!-- 底部 -->
		<footer class="footer">
			<!-- <img class="move-img" src="/@/assets/images/district/plate2.png" /> -->
		</footer>
	</div>
</template>

<script lang="ts" setup>
import {
	onMounted,
	onUnmounted,
	reactive,
	ref,
	defineAsyncComponent,
	getCurrentInstance,
	nextTick,
	computed,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
// import { debounce } from 'lodash';
import { getAPI } from "/@/utils/request";
import { LargeScreenApi } from "/@/api/sysApi";
import { formatDate } from "/@/utils/formatTime";
import QRCode from "qrcodejs2-fixes";
const QRCodeRef = ref(null);
const router = useRouter();

const state = reactive({
	id: 0,
	pageStyle: "",
	boardTitle: "",
	boardShortTitle: "",
	//街镇
	streetIndexList: [] as any, //索引数组
	streetList: [] as any,
	streetCheckedIndex: 0,
	checkedStreet: {} as any,
	//社区
	villageList: [] as any,
	villageCheckedIndex: 0,
	checkedVillage: {} as any,
	//统计数据
	districtTotal: {} as any,
	introduce: {} as any,
	openInfoTotal: {} as any,
	economyTotal: {} as any,
	inergralTotal: {} as any,
	volunteerList: [] as any,
	questionTotal: {} as any,
	argumentAmount: {} as any,
	reportTotal: {} as any,
});

onMounted(() => {
	initScreen();
	window.addEventListener("resize", () => {
		initScreen();
	});

	//加载
	getStreeList();

	//初始加载区级数据
	if (state.id === 0) {
		loadDistrictTotal();
	}
});
//当前地区展示标题
state.boardTitle = computed(() => {
	if (state.checkedVillage?.title) {
		return state.checkedVillage.title;
	}
	if (state.checkedStreet?.title) {
		return state.checkedStreet.title;
	}
	return "新津区";
});
//加载街道
const getStreeList = async () => {
	let query = {};
	const { data } = await getAPI(LargeScreenApi).streetList(query);
	let tmp = data.result ?? [];
	//数据格式化
	tmp = tmp.map((item: any, index: number) => {
		let data = {};
		data.id = item.id;
		data.title = item.name;
		data.checked = false;
		data.active = false;
		data.rotate = 0;
		return data;
	});
	state.streetList = tmp;
	state.streetIndexList = [];
	for (let i = 0; i < tmp.length; i++) {
		state.streetIndexList.push(i);
	}
	state.streetCheckedIndex = Math.ceil(state.streetList.length / 2) - 1;
	setTimeout(() => {
		goStreetRotate(state.streetCheckedIndex);
	}, 500);
};
const getStreetPlaceIndex = (_index: number) => {
	for (let i = 0; i < state.streetIndexList.length; i++) {
		if (state.streetIndexList[i] === _index) {
			return i;
		}
	}
};
//街道布局
const goStreetRotate = (baseIndex: number, check?: boolean) => {
	let index = getStreetPlaceIndex(baseIndex);
	let step = index - state.streetCheckedIndex;

	//点击街道,加载街道
	if (check) {
		//获取选中街道值
		state.id = state.streetList[baseIndex].id;
		loadStreetTotal();
		state.checkedStreet = state.streetList[baseIndex];
		state.streetList[baseIndex].checked = true;
		state.streetList[baseIndex].rotate = "0";
		state.streetList[baseIndex].opacity = 1;
		//加载社区
		getVillageList(state.streetList[baseIndex].title);
		//不能变streetList数据，只能变角度，不然重写渲染页面没有过渡效果
		//索引数据处理（更改排列位置）
		//上
		if (step < 0) {
			for (let i = 0; i < Math.abs(step); i++) {
				let last = state.streetIndexList.pop();
				state.streetIndexList.unshift(last);
			}
		}
		//下
		if (step > 0) {
			for (let i = 0; i < step; i++) {
				let first = state.streetIndexList.shift();
				state.streetIndexList.push(first);
			}
		}
		//样式设置
		//左侧
		for (let i = state.streetCheckedIndex - 1; i >= 0; i--) {
			let differ = state.streetCheckedIndex - i;
			state.streetList[state.streetIndexList[i]].rotate =
				"-" + differ * 30 + "deg";
			state.streetList[state.streetIndexList[i]].opacity =
				1 - 0.2 * (differ - 1);
			state.streetList[state.streetIndexList[i]].checked = false;
		}
		//右侧
		for (
			let i = state.streetCheckedIndex + 1;
			i < state.streetList.length;
			i++
		) {
			let differ = i - state.streetCheckedIndex;
			state.streetList[state.streetIndexList[i]].rotate =
				differ * 30 + "deg";
			state.streetList[state.streetIndexList[i]].opacity =
				1 - 0.2 * (differ - 1);
			state.streetList[state.streetIndexList[i]].checked = false;
		}
	} else {
		//初始加载
		state.streetList[index].rotate = "0";
		state.streetList[index].opacity = 1;
		//左侧
		for (let i = index - 1; i >= 0; i--) {
			let differ = index - i;
			state.streetList[i].rotate = "-" + differ * 30 + "deg";
			state.streetList[i].opacity = 1 - 0.2 * (differ - 1);
			state.streetList[i].checked = false;
		}
		//右侧
		for (let i = index + 1; i < state.streetList.length; i++) {
			let differ = i - index;
			state.streetList[i].rotate = differ * 30 + "deg";
			state.streetList[i].opacity = 1 - 0.2 * (differ - 1);
			state.streetList[i].checked = false;
		}
	}
};
//加载社区
const getVillageList = async (value: string) => {
	let query = { streetName: value };
	const { data } = await getAPI(LargeScreenApi).communityList(query);
	let tmp = data.result ?? [];
	//数据格式化
	tmp = tmp.map((item: any, index: number) => {
		let data = {};
		data.id = item.id;
		data.title = item.name;
		data.checked = false;
		data.active = item.status == 2 ? true : false;
		data.rotate = 0;
		return data;
	});
	state.villageList = tmp;
	state.villageCheckedIndex = Math.ceil(state.villageList.length / 2) - 1;
	//指定社区
	goVillageRotate(state.villageCheckedIndex);
};
//社区布局
const goVillageRotate = (index: number, check?: boolean) => {
	state.villageCheckedIndex = index;
	//手动点击
	if (check) {
		state.checkedVillage = state.villageList[index];
		state.id = state.villageList[index].id;
		//已开通
		if (state.villageList[index].active === true) {
			//生成二维码
			nextTick(() => {
				initQrcode(state.villageList[index]);
			});
			//加载统计数据
			loadVillageTotal();
			state.villageList[index].checked = true;
		} else {
			clearAmountData();
		}
	}
	//样式
	state.villageList[index].rotate = 0;
	//左侧
	for (let i = index - 1; i >= 0; i--) {
		let differ = index - i;
		state.villageList[i].rotate = "-" + differ * 5 + "deg";
		state.villageList[i].checked = false;
	}
	//右侧
	for (let i = index + 1; i < state.villageList.length; i++) {
		let differ = i - index;
		state.villageList[i].rotate = differ * 5 + "deg";
		state.villageList[i].checked = false;
	}
};
//加载区级统计数据
const loadDistrictTotal = () => {
	//清空数据
	clearAmountData();
	state.checkedStreet = {};
	state.checkedVillage = {};
	//街镇选中状态
	state.streetList = state.streetList.map((item: any) => {
		item.checked = false;
		return item;
	});
	//社区数据
	state.villageList = [];
	getDistrictTotal(); //社区数量统计
	openInfoTotal(); //开诚布公-三务公开
	getEconomyTotal(); //开诚布公-集体经济
	getIntegralTotal(); //信义诚折
	getQuestionTotal(); //诚心言事口
	getArgumentAmount(); //民事诚议
	getReportTotal(); //诚报
};
//加载街道统计数据
const loadStreetTotal = () => {
	clearAmountData();
	state.streetList = state.streetList.map((item: any) => {
		item.checked = false;
		return item;
	});
	state.checkedVillage = {};
	state.villageList = [];
	getDistrictTotal(); //社区数量统计
	openInfoTotal(); //开诚布公-三务公开
	getEconomyTotal(); //开诚布公-集体经济
	getIntegralTotal(); //信义诚折
	getQuestionTotal(); //诚心言事口
	getArgumentAmount(); //民事诚议
	getReportTotal(); //诚报
};
//加载社区统计数据
const loadVillageTotal = () => {
	//清空数据
	clearAmountData();
	getIntroduce(); //诚列史
	openInfoTotal(); //开诚布公-三务公开
	getEconomyTotal(); //开诚布公-集体经济
	getIntegralTotal(); //信义诚折
	getVolunteerList(); //志愿者
	getQuestionTotal(); //诚心言事口
	getArgumentAmount(); //民事诚议
	getReportTotal(); //诚报
};

//区级、街镇诚列史、街镇数量统计
const getDistrictTotal = async () => {
	let query = {
		id: state.id,
		name: state.checkedStreet?.title,
	};
	const { data } = await getAPI(LargeScreenApi).districtTotal(query);
	let tmp = data.result ?? {};
	state.districtTotal = tmp;
	state.introduce = {
		...state.districtTotal,
	};
	state.boardShortTitle = tmp.aliasName;
};
//社区诚列史
const getIntroduce = async () => {
	const { data } = await getAPI(LargeScreenApi).introduce({
		id: state.id,
	});
	let tmp = data.result ?? {};
	state.introduce = tmp;
	state.boardShortTitle = tmp.aliasName;
};
//开诚布公-三务公开
const openInfoTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).openInfoTotal({
		id: state.id,
	});
	state.openInfoTotal = data.result ?? {};
};
//开诚布公-集体经济
const getEconomyTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).economyTotal({
		id: state.id,
	});
	state.economyTotal = data.result ?? {};
};
//信义诚折
const getIntegralTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).integralTotal({
		id: state.id,
	});
	state.inergralTotal = data.result ?? {};
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
};
//诚心言事口
const getQuestionTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).questionsAndAnswersTotal({
		id: state.id,
	});
	state.questionTotal = data.result ?? {};
};
//民事诚议
const getArgumentAmount = async () => {
	const { data } = await getAPI(LargeScreenApi).civilData({
		id: state.id,
	});
	state.argumentAmount = data.result ?? {};
};
//诚报
const getReportTotal = async () => {
	const { data } = await getAPI(LargeScreenApi).reportTotal({
		id: state.id,
	});
	let tmp = data.result ?? {};
	state.reportTotal = tmp;
};

//清除缓存
const clearCache = async () => {
	console.log(state.id, "清理");
	const { data } = await getAPI(LargeScreenApi).clearCache({
		id: state.id,
	});
	ElMessage({
		message: `缓存已清理`,
		type: "warning",
		showClose: true,
	});
};

//二维码
import chengImg from "/@/assets/images/cheng2.png";
import ballImg from "/@/assets/images/district/moon.png";

const initQrcode = async (village?: any) => {
	let colorDark = "#148084";
	let colorLight = "#ffffff";
	let qrUrl = encodeURI(
		window.location.origin + "/#/community?id=" + village?.id
	);
	QRCodeRef.value.innerHTML = "";
	const qrCode = new QRCode(QRCodeRef.value, {
		text: `${qrUrl}`,
		width: 80,
		height: 80,
		colorDark: colorDark,
		colorLight: colorLight,
	});
	const logoImage = chengImg;
	if (logoImage && village?.active) {
		let logo = new Image();
		logo.setAttribute("corssOrigin", "Anonymous");
		logo.src = logoImage;
		logo.onload = () => {
			let qrImg = qrCode._el.getElementsByTagName("img")[0];
			let canvas = qrCode._el.getElementsByTagName("canvas")[0];
			let ctx = canvas.getContext("2d");
			ctx.drawImage(logo, 25, 25, 30, 30);
			qrImg.src = canvas.toDataURL();
			// qrImg.style.display = "none";
			// canvas.style.display = "block";
		};
	}
};
const getClassName = (checked: boolean, active: boolean) => {
	let className = "item";
	if (active) {
		className += " active";
	} else {
		className += " disable";
	}
	if (checked) {
		className += " checked";
	}
	return className;
};
const changeStreetList = (index: number) => {
	//点击的下方
	if (index > state.streetCheckedIndex) {
		let del = state.streetList.shift();
		state.streetList.push(del);
	} else {
		let del = state.streetList.pop();
		state.streetList.unshift(del);
	}
};

//清空数据
const clearAmountData = () => {
	const defaultTotal = {
		boardShortTitle: "",
		introduce: {} as any,
		openInfoTotal: {} as any,
		economyTotal: {} as any,
		inergralTotal: {} as any,
		volunteerList: [] as any,
		questionTotal: {} as any,
		argumentAmount: {} as any,
		reportTotal: {} as any,
	};
	for (const key in defaultTotal) {
		state[key] = defaultTotal[key];
	}
	// initQrcode();
};
// 区级数据
const goDistrictTotal = () => {
	state.id = 0;
	loadDistrictTotal();
};
//跳转到社区大屏
const goCommuinty = () => {
	if (state.id === 0) {
		ElMessage({
			message: `请选择社区`,
			type: "warning",
			showClose: true,
		});
		return;
	}
	if (state.checkedVillage.active == false) {
		ElMessage({
			message: `${state.checkedVillage.title} 未开通`,
			type: "warning",
			showClose: true,
		});
		return;
	}
	router.push(`community?from=screen&id=${state.id}`);
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
</script>
<style lang="scss">
* {
	box-sizing: border-box;
}
body,
#app {
	height: 100%;
	overflow: hidden;
}
:root {
	--mainColor1: #ffffff;
	--mainColor2: #3bdefb;
	--mainColor3: #cb7e2c;
}
</style>
<style lang="scss" scoped>
::-webkit-scrollbar-track-piece {
	background: #0a775a8a;
}
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
}
::-webkit-scrollbar-thumb {
	background: #1ecfa0a9;
	border-radius: 5px;
}
.num {
	font-family: "electronicFont" !important;
	font-size: 35px;
	text-align: center;
	color: #1ecfa1;
	height: 45px;
	line-height: 45px;
}

.screen-page {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background: url("/@/assets/images/district/bg.jpg");
	background-size: 100% 100%;
	background-color: #10141a;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
// 渐变色
.gradient-color {
	display: inline-block;
	background-image: linear-gradient(to bottom, #fff, #3bdefb);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
// 渐变色
@mixin gradient-color {
	background-image: linear-gradient(to bottom, #fff, #3bdefb);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
// 标题渐变色
.gradient-active-color {
	background-image: linear-gradient(to bottom, #d5bba2, #f3922e);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
// 标题渐变色
@mixin gradient-active-color {
	background-image: linear-gradient(to bottom, #d5bba2, #f3922e);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
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

.header {
	position: fixed;
	z-index: 99;
	left: 0;
	top: 0;
	width: 100%;
	height: 102px;
	background: url("/@/assets/images/district/top.png") center bottom no-repeat;
	background-size: auto 100%;
	text-align: center;

	.screen-subtitle {
		margin-top: 15px;
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
}
.footer {
	position: fixed;
	z-index: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 76px;
	background: url("/@/assets/images/district/bottom.png") center bottom
		no-repeat;
	background-size: auto 100%;
}
.screen-title {
	font-size: 28px;
	margin-top: 10px;
}
.street-board {
	position: absolute;
	left: 165px;
	top: 50%;
	.street-center {
		position: absolute;
		width: 165px;
		right: 100%;
		top: -22px;
		text-align: right;
		.moon {
			position: absolute;
			left: -50px;
			top: -40px;
			z-index: 8;
			animation: moonRotate 5s infinite;
		}
		b {
			position: relative;
			cursor: pointer;
			margin-right: 20px;
			z-index: 9;
			font-size: 32px;
			@include gradient-color();
			&.active {
				@include gradient-active-color();
			}
			&:hover {
				text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
			}
		}
	}
	.item {
		width: 320px;
		height: 274px;
		position: absolute;
		top: -137px;
		background: url("/@/assets/images/district/street.png") left center
			no-repeat;
		cursor: pointer;
		transform-origin: -170px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: #fff;
		transition: 0.3s;
		b {
			background-image: linear-gradient(to bottom, #fff, #3bdefb);
			color: transparent;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			transform: 0.3s;
		}
		&:hover {
			background: url("/@/assets/images/district/street_hover.png") left
				center no-repeat;
			b {
				background-image: linear-gradient(to bottom, #d5bba2, #f3922e);
			}
		}
		.arr {
			position: absolute;
			display: none;
			left: 100%;
		}
		&.checked {
			z-index: 99;
			background: url("/@/assets/images/district/street_active.png") 3px
				center no-repeat;
			b {
				font-size: 32px;
				background-image: linear-gradient(to bottom, #d5bba2, #f3922e);
				color: transparent;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.arr {
				display: block;
			}
		}
	}
}
.community-card {
	position: absolute;
	left: 570px;
	top: 0;
	bottom: 0;
	.circle {
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: -595px;
		width: 1191px;
		height: 1191px;
		border: 2px #0c3f3f solid;
		border-radius: 50%;
	}
}
.marktip {
	position: absolute;
	top: 50%;
	left: -210px;
	width: 414px;
	height: 100px;
	transform-origin: -570px;
	// transform: rotate(30deg);
}
.village {
	position: absolute;
	top: 50%;
	left: -23px;
	li.item {
		position: absolute;
		transform-origin: -595px;
		left: 0;
		top: -21px;
		width: 154px;
		height: 42px;
		background: url("/@/assets/images/district/community_disable.png") left
			center no-repeat;
		color: #999999;
		line-height: 42px;
		padding-left: 57px;
		transition: 0.3s;
		display: flex;
		align-items: center;
		cursor: pointer;
		b {
			font-weight: normal;
		}
		.arr {
			position: absolute;
			display: none;
			left: 160px;
			// margin-left: 20px;
		}
		&.active {
			background: url("/@/assets/images/district/community.png") left
				center no-repeat;
			b {
				@include gradient-color;
			}
		}
		&.checked {
			background: url("/@/assets/images/district/community_active.png")
				left center no-repeat;
			.arr {
				display: block;
			}
			b {
				@include gradient-active-color;
			}
		}
		&.disable {
			cursor: not-allowed;
			background: url("/@/assets/images/district/community_disable.png")
				left center no-repeat;
		}
		&:not(.disable):hover {
			left: 5px;
			opacity: 0.9;
		}
	}
}
.content-box {
	position: absolute;
	margin: auto;
	top: 110px;
	bottom: 77px;
	left: 800px;
	right: 70px;
	display: flex;
	transition: 0.3s;
}
.data-card {
	border: 1px #f3922e solid;
	padding: 30px;
	min-width: 500px;
	min-height: 200px;
	background-color: rgba(9, 21, 25, 0.6);
	box-shadow: 0 0 70px #f58820 inset;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.card {
	color: #bdf1ff;
	font-size: 12px;
	margin-bottom: 10px;
}
.card-title {
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
	background: url("/@/assets/images/district/icon_title.png") left center
		no-repeat;
	b {
		@include gradient-active-color;
		margin-left: 25px;
	}
	.icon {
		margin-right: 5px;
	}
}
.card-main {
	display: flex;
	flex-grow: 1;
	.side-icon {
		width: 43px;
		height: 43px;
		margin-right: 5px;
		background: url("/@/assets/images/district/icon.png") center center
			no-repeat;
		background-size: 100% 100%;
		font-size: 14px;
		line-height: 1.2;
		display: flex;
		align-items: center;
		justify-content: center;
		b {
			width: 2em;
			font-weight: normal;
			@include gradient-active-color;
		}
	}
	.side-icon-box {
		background: url("/@/assets/images/district/icon_bg.png") center center
			no-repeat;
	}
}
.card-databar {
	width: 100%;
	display: flex;
	margin-bottom: 5px;
	li {
		width: calc(25% - 5px);
		min-height: 43px;
		margin-right: 5px;
		padding: 7px 10px;
		border: 1px solid;
		background-color: #1f2521;
		text-align: center;
		border-image: linear-gradient(to right, #26505d, #877457) 1;
		p {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.num {
			font-size: 28px;
			height: auto;
			line-height: 1;
			@include gradient-color;
		}
		small {
			margin-left: 3px;
		}
	}
}
.flex-databar {
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		p {
			margin-left: 30px;
		}
	}
}
.card {
	.card-top {
		display: flex;
		align-items: center;
		.card-databar {
			li {
				padding: 0 10px;
				min-height: auto;
				.title {
					color: #cb7e2c;
				}
				.num {
					color: var(--mainColor3);
				}
			}
		}
	}
}

.function-card {
	padding: 30px 50px 50px 50px;
	min-height: 200px;
	background-color: rgba(9, 21, 25, 0.6);
	box-shadow: 0 0 70px #50d9f4 inset;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.function-card-title {
		@include gradient-active-color;
		font-size: 32px;
		text-align: center;
	}
	.amount {
		margin-top: 20px;
		color: #fff;
		li {
			text-align: center;
			display: flex;
			align-items: center;
			.title {
				color: #fff;
			}
			.num {
				color: #fff;
			}
			small {
				margin-left: 2px;
			}
		}
	}
	.qr-code-box {
		text-align: center;
		margin-top: 50px;
		width: 181px;
		min-height: 157px;
		background: url("/@/assets/images/district/dish.png") center bottom
			no-repeat;
		background-size: 100% auto;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		.qrcode {
			border: 3px #fff solid;
		}
		.moon {
			width: 70px;
			height: 70px;
			z-index: 8;
			animation: moonRotate 5s infinite;
		}
	}
	.btn {
		cursor: pointer;
		margin-top: 50px;
		width: 190px;
		height: 72px;
		background: url("/@/assets/images/district/btn.png");
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover {
			box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
		}
		img {
			margin-right: 10px;
		}
		b {
			font-size: 20px;
			@include gradient-color;
		}
	}
}

.footer {

	// .move-img {
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	z-index: 2;
	// 	-webkit-mask-image: url("/@/assets/images/district/bb.png");
	// 	-webkit-mask-size: 50% 50%;
	// 	-webkit-mask-composite: intersect;
	// }
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
	}
}

//动画-旋转
@keyframes moonRotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
//子标题放大特效
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
.animate-flash {
	animation: animateFlash 3s infinite;
}
//箭头
@keyframes animateFlash {
	0% {
		transform: translateX(0px);
	}
	10% {
		transform: translateX(3px);
	}
	20% {
		transform: translateX(0px);
	}
	50% {
		transform: translateX(3px);
	}
	100% {
		transform: translateX(0px);
	}
}
//按钮图标动画
.animat-btn-rotate {
	animation: animateBtnRotate 3s 1s ease-in-out infinite;
}
@keyframes animateBtnRotate {
	0% {
		transform: rotate(0);
	}
	50% {
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
