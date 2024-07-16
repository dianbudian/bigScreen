<template>
    <!-- 区级 -->
    <div class="screen-page" :style="state.pageStyle">
        <div class="sreen-bg"></div>
        <!-- 大标题 -->
        <header class="header">
            <div class="flex flex-ai-center flex-jc-center" style="height:60px">
                <div class="position-relative">
                    <b class="gradient-color screen-title position-relative z-index-up">新津区基层治理“诚”列馆</b>
                    <b class="screen-title title-shadow">新津区基层治理“诚”列馆</b>
                </div>
            </div>
            <div class="screen-subtitle">真诚待人 真心为民</div>
            <!-- 时间 -->
            <div class="date-bar">
                <div class="date-main">
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
                <div class="nav-back-btn" v-if="state.from" @click="jumpDistrict()">区级大屏</div>
            </div>
            <!-- 天气/二维码 -->

            <div class="weather">
                <div class="state-bar">
                    <!-- <el-checkbox v-model="state.isAutoPlay" label="自动轮巡" /> -->
                    <el-switch v-model="state.isAutoPlay" size="large" width="60" inline-prompt active-text="自动" inactive-text="手动" style="--el-switch-on-color: #347e91;--el-switch-off-color: #275e6c90 " />
                </div>
                <span class="weather-address">空气质量</span>
                <iframe scrolling="no" src="https://widget.tianqiapi.com?style=tg&skin=pitaya&city=新津&color=fff" style="color: #fff; " frameborder="0" width="100%" height="50" allowtransparency="true"></iframe>
            </div>
        </header>

        <!-- 街镇 -->
        <div class="street-town">
            <div class="street-center" :class="state.id===0 ? 'item checked': 'item'" @click="goDistrictTotal()">
                <b>新津区</b>
                <img class="arr animate-flash" src="/@/assets/images/district/street_arrow.png" />
            </div>
            <div v-for="(item,index) in state.streetList" :key="index" :class="item.checked ? 'item checked': 'item'" @click="clickStreet(index, true)">
                <b>{{item.title}}</b>
                <img class="arr animate-flash" src="/@/assets/images/district/street_arrow.png" />
            </div>
        </div>
        <!-- 已选社区 -->
        <div class="community-card">
            <ul class="village" @mouseover="changeAutoPlay(false)" @mouseout="leaveAutoPlay()">
                <li v-for="(item,index) in state.villageList" :key="index" :class="getClassName(item.checked,item.active)" @click="clickVillage(index,true)">
                    <b>{{item.title}}</b>
                    <img class="arr animate-flash" src="/@/assets/images/district/street_arrow.png" />
                </li>
            </ul>
        </div>

        <!-- 内容 -->
        <div class="content-box" :style="state.id===0?'left:340px;':''">
            <!-- 数据区 -->
            <div :class="state.dataCardClassName">
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
                        <ul class="card-databar ">
                            <li>
                                <p>
                                    <span class="num">{{state.openInfoTotal?.partyAffairsTotal ?? '--'}}</span>
                                </p>
                                <span class="title">党务公开（条）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.openInfoTotal?.villageAffairsTotal ?? '--'}}</span>
                                </p>
                                <span class="title">村务公开（条）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.openInfoTotal?.financeTotal ?? '--'}}</span>
                                </p>
                                <span class="title">财务公开（条）</span>
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
                        <ul class="card-databar">
                            <li>
                                <p>
                                    <span class="num">{{state.questionTotal?.questionTotal ?? '--'}}</span>
                                </p>
                                <span class="title">群众问题（条）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.questionTotal?.answerTotal ?? '--'}}</span>
                                </p>
                                <span class="title">社区回答（条）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.questionTotal?.noAnswerTotal ?? '--'}}</span>
                                </p>
                                <span class="title">暂未回复（条）</span>
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
                        <ul class="card-databar">
                            <li>
                                <p>
                                    <span class="num">{{state.argumentAmount?.topicsTotal ?? '--'}}</span>
                                </p>
                                <span class="title">发布议题（项）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.argumentAmount?.meetingTotal ?? '--'}}</span>
                                </p>
                                <span class="title">召开会议（场）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.argumentAmount?.matterTotal ?? '--'}}</span>
                                </p>
                                <span class="title">议决事项（项）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.argumentAmount?.personTotal ?? '--'}}</span>
                                </p>
                                <span class="title">参与议事人员（人）</span>
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
                        <ul class="card-databar">
                            <li>
                                <p>
                                    <span class="num">{{state.reportTotal.categoryTotal ?? '--'}}</span>
                                </p>
                                <span class="title">分类数量（个）</span>
                            </li>
                            <li>
                                <p>
                                    <span class="num">{{state.reportTotal.total ?? '--'}}</span>
                                </p>
                                <span class="title">总数量（条）</span>
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
                            <div v-if="state.checkedVillage?.active===false" class="empty">未开通</div>
                            <div class="circle" v-else>
                                <img class="moon" src="/@/assets/images/district/moon.png" />
                            </div>
                        </template>
                    </div>

                    <ul class="amount" v-if="!state.checkedVillage?.id">
                        <li v-if="state.districtTotal?.streetCount">
                            <p>街道：</p>
                            <p>
                                <span class="num">{{state.districtTotal.streetCount ?? '--'}}</span>
                                <span>个</span>
                            </p>
                        </li>
                        <li>
                            <p>社区：</p>
                            <p>
                                <span class="num">{{state.districtTotal.communityCount ?? '--'}}</span>
                                <span>个</span>
                            </p>
                        </li>
                        <li>
                            <p>已开通社区：</p>
                            <p>
                                <span class="num">{{state.districtTotal.openCount ?? '--'}}</span>
                                <span>个</span>
                            </p>
                        </li>
                    </ul>
                    <div class="about-text" v-else>{{state.introduce?.situation?.substr(0,100)}}...</div>
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
            <img class="move-img" src="/@/assets/images/district/bottom_rotate.png" />
            <img class="bg" src="/@/assets/images/district/bottom.png" />
            <div class="tec"><span style="margin-right: 10px;">数据来源：智慧蓉城“报表通”·新津区</span> <span style="margin-left: 10px;">技术支持：汇编科技</span></div>
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
    watch,
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
    //街镇
    lastActionTime: null as any,
    isBaseAutoPlay: true, //是否自动轮询(操作)
    isAutoPlay: true, //是否自动轮询(显示)
    streetAutoPlayIndex: 0 as number,
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
    //数据面板样式名
    dataCardClassName: "data-card",
});
let autoPlayStreetTimer = null;
onMounted(() => {
    document.title = "新津区基层治理“诚”列馆";

    //屏幕尺寸小于1920采用比例
    if (window.innerWidth < 1920) {
        initScreen();
    }
    window.addEventListener("resize", () => {
        if (window.innerWidth < 1920) {
            initScreen();
        } else {
            state.pageStyle = "";
        }
    });
    getPageDate();
    //加载
    getStreeList();
    //初始加载区级数据
    if (state.id === 0) {
        loadDistrictTotal();
    }
    watchAction();
});
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
state.dataCardClassName = computed(() => {
    if (state.checkedVillage?.active) {
        return "data-card";
    } else {
        if (state.checkedVillage?.active === false) {
            return "data-card disable";
        }
    }
    return "data-card";
});
//自动播放控制状态
watch(
    () => state.isBaseAutoPlay,
    (_newValue) => {
        if (_newValue === true) {
            clearAutoPlayStreet();
            autoPlayStreet();
        }
        if (_newValue === false) {
            clearAutoPlayStreet();
        }
    }
);
//自动播放显示状态
watch(
    () => state.isAutoPlay,
    (_newValue) => {
        state.isBaseAutoPlay = _newValue ? true : false;
    }
);
//改变播放状态
const changeAutoPlay = () => {
    state.isBaseAutoPlay = false;
};
//鼠标离开回复播放状态
const leaveAutoPlay = () => {
    state.isBaseAutoPlay = state.isAutoPlay ? true : false;
};

function minutesBetweenDates(date1, date2) {
    const oneMinute = 60 * 1000; // 1分钟的毫秒数
    const diff = Math.abs(date2.getTime() - date1.getTime()); // 计算时间差
    return diff / oneMinute; // 返回分钟数
}
const watchAction = () => {
    setInterval(() => {
        let now = new Date();
        const minutesDifference = minutesBetweenDates(
            now,
            state.lastActionTime
        );
        if (minutesDifference >= 2) {
            state.isAutoPlay = true;
        }
    }, 60000);
};
// function minutesBetweenDates(date1, date2) {
// 	const oneSeconde = 1 * 1000; // 1秒的毫秒数
// 	const diff = Math.abs(date2.getTime() - date1.getTime()); // 计算时间差
// 	return diff / oneSeconde; // 返回秒数
// }
// const watchAction = () => {
// 	setInterval(() => {
// 		let now = new Date();
// 		const minutesDifference = minutesBetweenDates(
// 			now,
// 			state.lastActionTime
// 		);
// 		if (minutesDifference >= 20) {
// 			state.isAutoPlay = true;
// 		}
// 	}, 1000);
// };
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
    state.streetAutoPlayIndex = state.streetCheckedIndex;
    //最终操作时间
    state.lastActionTime = new Date();
    setTimeout(() => {
        goStreetRotate(state.streetCheckedIndex);
        nextTick(() => {
            autoPlayStreet();
        });
    }, 500);
};
const getStreetPlaceIndex = (_index: number) => {
    for (let i = 0; i < state.streetIndexList.length; i++) {
        if (state.streetIndexList[i] === _index) {
            return i;
        }
    }
};

//自动旋转街道
const autoPlayStreet = () => {
    autoPlayStreetTimer = setInterval(() => {
        state.streetAutoPlayIndex++;
        if (state.streetAutoPlayIndex >= state.streetList.length) {
            state.streetAutoPlayIndex = 0;
        }
        goStreetRotate(state.streetAutoPlayIndex, true);
    }, 7000);
};
const clearAutoPlayStreet = () => {
    clearInterval(autoPlayStreetTimer);
};

const clickStreet = (baseIndex: number, check?: boolean) => {
    state.isAutoPlay = false;
    state.lastActionTime = new Date();
    goStreetRotate(baseIndex, check);
};
const clickVillage = (baseIndex: number, check?: boolean) => {
    state.isAutoPlay = false;
    state.lastActionTime = new Date();
    goVillageRotate(baseIndex, check);
};

//街道布局
const goStreetRotate = (baseIndex: number, check?: boolean) => {
    state.streetAutoPlayIndex = baseIndex;
    let index = getStreetPlaceIndex(baseIndex);
    let step = index - state.streetCheckedIndex;

    //点击街道,加载街道
    if (check) {
        //获取选中街道值
        state.id = state.streetList[baseIndex]?.id;
        state.checkedStreet = state.streetList[baseIndex];
        loadStreetTotal();
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
        } else {
            clearAmountData();
        }
        state.villageList[index].checked = true;
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
    state.streetList = state.streetList.map((item: any, _index: number) => {
        if (state.streetCheckedIndex !== _index) {
            item.checked = false;
        }
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
    let checkedStreet = state.streetList.find((item: any) => {
        return item.id == state.id;
    });

    let query = {
        id: state.id,
        name: checkedStreet?.title,
    };
    console.log(checkedStreet, query);
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
import chengImg from "/@/assets/images/cheng.png";
import cheng2Img from "/@/assets/images/cheng2.png";
import ballImg from "/@/assets/images/district/moon.png";

const initQrcode = async (village?: any) => {
    let colorDark = "#000000";
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
            ctx.drawImage(logo, 30, 30, 20, 20);
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
// const changeStreetList = (index: number) => {
// 	//点击的下方
// 	if (index > state.streetCheckedIndex) {
// 		let del = state.streetList.shift();
// 		state.streetList.push(del);
// 	} else {
// 		let del = state.streetList.pop();
// 		state.streetList.unshift(del);
// 	}
// };

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
body {
    background: url("/@/assets/images/district/bg.jpg");
    background-size: 100% 100%;
    background-color: #10141a;
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

    -webkit-mask-image: url("/@/assets/images/district/cloud.jpg");
    -webkit-mask-size: 100% 100%;
    -webkit-mask-composite: add;
    -webkit-mask-mode: match-source;
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
.sreen-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("/@/assets/images/district/cloud.png") center bottom
        no-repeat;
    background-size: auto 100%;
    animation: animationScreenBgRotate ease-in-out 50s infinite;
}
.header {
    position: fixed;
    z-index: 101;
    left: 0;
    top: 0;
    width: 100%;
    height: 102px;
    background: url("/@/assets/images/district/top.png") center bottom no-repeat;
    background-size: auto 100%;
    text-align: center;
    .date-bar {
        position: absolute;
        top: 20px;
        left: 30px;
        color: #fff;
        text-align: left;
        display: flex;
        align-items: center;
        color: #fff;
        .date-main {
            border-right: 1px #777 dotted;
            padding-right: 10px;
        }
        .date {
            font-size: 18px;
            .num {
                line-height: 1;
                font-size: 20px;
                color: #fff;
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
        right: 0px;
        display: flex;
        align-items: center;
        .state-bar {
            position: absolute;
            right: 100%;
            :deep(.el-checkbox) {
                .el-checkbox__label {
                    padding-left: 3px;
                }
                &.is-checked {
                    .el-checkbox__label {
                        color: #fff;
                    }
                    .el-checkbox__inner {
                        background: #1b7497;
                        border-color: #1b7497;
                    }
                }
            }
        }
        .weather-address {
            position: absolute;
            top: 0px;
            left: 0;
            width: 110px;
            text-align: center;
            background: #19160e;
            border-radius: 10px;
            color: #fff;
            font-size: 12px;
        }
    }

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

.screen-title {
    font-size: 32px;
    letter-spacing: 5px;
    margin-top: 5px;
}

.street-town {
    position: absolute;
    left: 30px;
    top: 120px;
    bottom: 72px;
    .item {
        width: 250px;
        height: calc(100% / 9 - 10px);
        margin: 10px 20px 10px 0px;
        border-radius: 10px;
        z-index: 99;
        background: linear-gradient(to right, #275e6c80, #275e6c80);
        cursor: pointer;
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
            background: linear-gradient(to right, #836c49, #275e6c);
            b {
                background-image: linear-gradient(to bottom, #d5bba2, #f3922e);
            }
        }
        .arr {
            position: absolute;
            display: none;
            left: calc(100% - 10px);
        }
        &.checked {
            z-index: 100;
            background: linear-gradient(to right, #275e6c, #836c49);
            box-shadow: 0 0 30px #4db7d1 inset;
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
    left: 340px;
    top: 120px;
    bottom: 72px;

    .village {
        li.item {
            width: 200px;
            height: 55px;
            margin: 10px 20px 10px 0px;
            background: url("/@/assets/images/district/community_disable1.png")
                left center no-repeat;
            color: #999999;
            line-height: 55px;
            padding-left: 67px;
            transition: 0.3s;
            font-size: 18px;
            display: flex;
            align-items: center;
            cursor: pointer;
            b {
                font-weight: normal;
            }
            .arr {
                position: absolute;
                display: none;
                left: 210px;
            }
            &.active {
                background: url("/@/assets/images/district/community1.png") left
                    center no-repeat;
                b {
                    @include gradient-color;
                }
            }
            &.checked {
                font-size: 20px;
                background: url("/@/assets/images/district/community_active1.png")
                    left center no-repeat;
                .arr {
                    display: block;
                }
                b {
                    @include gradient-active-color;
                }
            }
            &.disable {
                background: url("/@/assets/images/district/community_disable1.png")
                    left center no-repeat;
            }
            &:not(.disable):hover {
                left: 5px;
                opacity: 0.9;
            }
        }
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
.content-box {
    position: absolute;
    margin: auto;
    top: 130px;
    bottom: 77px;
    left: 600px;
    right: 30px;
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
.data-card.disable {
    border: 1px #666 solid;
    box-shadow: 0 0 70px #666 inset;
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
        width: calc(25% - 10px);
        min-height: 43px;
        margin-right: 10px;
        padding: 10px 10px;
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
    padding: 30px 50px 30px 50px;

    min-height: 200px;
    background-color: rgba(9, 21, 25, 0.6);
    box-shadow: 0 0 70px #50d9f4 inset;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .function-card-title {
        @include gradient-active-color;
        font-size: 32px;
        text-align: center;
    }
    .about-text {
        margin-top: 20px;
        width: 180px;
        font-size: 15px;
        text-align: justify;
        color: var(--main-primary-color);
    }
    .amount {
        min-width: 200px;
        margin-top: 20px;
        color: #fff;
        li {
            text-align: center;
            display: flex;
            align-items: center;
            p {
                width: 50%;
            }
            p:first-child {
                text-align: right;
            }
            p:last-child {
                text-align: left;
                display: flex;
                align-items: center;
            }
            .title {
                color: #fff;
            }
            .num {
                @include gradient-active-color();
            }
        }
    }
    .qr-code-box {
        text-align: center;
        margin-top: 50px;
        width: 181px;
        min-height: 157px;
        padding-top: 20px;
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
            animation: moonRotate ease-in-out 5s infinite;
        }
        .empty {
            margin-top: 35px;
            font-size: 24px;
            color: #999999;
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
    position: fixed;
    z-index: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    // background: url("/@/assets/images/district/bottom.png") center bottom
    // 	no-repeat;
    // background-size: auto 100%;
    .tec {
        position: absolute;
        width: 100%;
        bottom: 2px;
        z-index: 100;
        color: #ccc;
        font-size: 12px;
    }
    .bg {
        width: 713px;
        height: 31px;
        margin: 0 auto;
        position: relative;
        z-index: 99;
        display: block;
    }
    .move-img {
        position: absolute;
        left: 50%;
        margin-left: -60px;
        top: -30px;
        z-index: 98;
        animation: moonRotate linear 10s infinite;
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
//背景旋转动画
@keyframes animationScreenBgRotate {
    0% {
        transform: rotate(0) scale(1);
        opacity: 0.9;
    }
    50% {
        transform: rotate(30deg) scale(1.5);
        opacity: 0.2;
    }
    100% {
        transform: rotate(0deg) scale(1);
        opacity: 0.9;
    }
}
</style>
