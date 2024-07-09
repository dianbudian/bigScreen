<template>
	<div class="page boer-dialog">
		<el-dialog v-model="state.isShowDialog" :close-on-click-modal="false" :fullscreen="$isMobile?true:false" width="800" height="80%" @close="closeDialog">
			<template #header>
				<div style="color: #fff; text-align:center">
					<span>详细内容</span>
				</div>
			</template>
			<el-descriptions class="margin-top" :column="1" border label-class-name="label">
				<el-descriptions-item v-for="(col,index) in state.tableInfo.columns" :key="index">
					<template #label>{{col.name}}</template>
					<img v-if="getColumnType(state.formData[col.column])=='img'" height="50" :src="getImg(state.formData[col.column])" @click="showViewer(transformImgData(state.formData[col.column]))" />
					<span v-else>{{dealField(state.formData[col.column], col.sensitive)}}</span>
					<!-- {{dealField(state.formData[col.column], col.sensitive)}} -->
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
		
		<el-image-viewer v-if="state.isViewer" :urlList="state.pics" @close="closeViewer" :zIndex="9999"></el-image-viewer>

	</div>
</template>

<script lang="ts" setup>
import {
	onMounted,
	reactive,
	getCurrentInstance,
	defineAsyncComponent,
} from "vue";
import { getAPI } from "/@/utils/request";
import { DiyDataApi } from "/@/api/sysApi";
import { isMobile } from "/@/utils/other";

const { proxy } = getCurrentInstance();
const $isMobile = isMobile();

const APIURL = "https://xjly.hbzg.cn";
const state = reactive({
	isShowDialog: false,
	isViewer: false, //图片预览
	loading: false,
	isShowDialog: false,
	tableInfo: {} as any,
	formData: [] as any,
});
onMounted(() => {});
//获取第一张图片
const getImg = (jsonStr: String) => {
	if (!jsonStr) return false;
	let json = JSON.parse(jsonStr);
	if (json.length && json[0]?.url) {
		return APIURL + json[0].url;
	}
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
		}
	}
	return imgs;
};
const showViewer = (pics: any) => {
	state.pics = pics;
	state.isViewer = true;
};
const closeViewer = () => {
	state.isViewer = false;
	state.pics = [];
};
// 获取列类型
const getColumnType = (v: any) => {
	if (v === "" || v === undefined || v === null) {
		return "text";
	}
	
	if (v.includes("/Upload/") && v.includes("url")) {
		if (
			v.includes(".jpg") ||
			v.includes(".png") ||
			v.includes(".gif") ||
			v.includes(".jpeg")
		)
			return "img";
	}
	return "text";
};
//字段脱敏
const dealField = (v: any, sensitive: any) => {
	if (v) {
		if (sensitive == "realName") {
			v = v.substr(0, 1) + "**";
		}
		if (sensitive == "phone") {
			v = v.substr(0, 4) + "****" + v.substr(-4, 4);
		}
	}
	return v;
};
const openDialog = (tableInfo: any, row: any) => {
	console.log("dialog",tableInfo,row);
	state.tableInfo = tableInfo;
	state.formData = row;
	state.isShowDialog = true;
};
const closeDialog = () => {
	state.isShowDialog = false;
};

// 导出对象
defineExpose({ openDialog });
</script>
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
.page {
	:deep(.el-dialog) {
		
		background-color: #141414;
		border: 1px solid #1ecfa1;
		.el-descriptions__label {
			width: 120px;
		}	
		.el-dialog__body {
			border-top: 1px solid #1ecfa1;
			padding: 0 !important;
		}
		.el-dialog__footer {
			background-color: #242424;
		}
		.el-descriptions__body {
			background-color: transparent;
		}
		.el-descriptions__label.el-descriptions__cell.is-bordered-label {
			background-color: rgb(26 46 51 / 53%) !important;
			color: #aaa;
			border-color: #69778f55;
		}
		.el-descriptions__content.el-descriptions__cell.is-bordered-content {
			color: #999;
			border-color: #69778f55;
		}
	}
}
</style>
