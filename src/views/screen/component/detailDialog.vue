<template>
	<div class="page boer-dialog">
		<el-dialog v-model="state.isShowDialog" :close-on-click-modal="false" :fullscreen="$isMobile?true:false" width="800" height="80%" @close="closeDialog">
			<template #header>
				<div style="color: #fff; text-align:center">
					<span>{{state.pageTitle}}</span>
				</div>
			</template>
			<el-descriptions class="margin-top" :column="1" border label-class-name="label">
				<el-descriptions-item v-for="(col,index) in state.tableInfo?.columns" :key="index">
					<template #label>{{col.name}}</template>
					
					<FiedViewer :row="state.formData" :value="state.formData[col.column]"></FiedViewer>
	
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>

		<!-- <el-image-viewer v-if="state.isViewer" :urlList="state.pics" @close="closeViewer" :zIndex="9999"></el-image-viewer> -->
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
import { isMobile } from "/@/utils/other";
import FiedViewer from "../../components/fieldViewer/fieldViewer.vue";

const { proxy } = getCurrentInstance();
const $isMobile = isMobile();

const state = reactive({
	pageTitle: '',
	isShowDialog: false,
	isViewer: false, //图片预览
	loading: false,
	tableInfo: {} as any,
	formData: [] as any,
});
onMounted(() => {});

//字段脱敏(未使用)
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
const openDialog = (tableInfo: any, row: any, pageTitle?: String) => {
	state.pageTitle = pageTitle ?? '详细内容';
	//过滤字段
	tableInfo.columns = tableInfo?.columns?.filter(
		(item: any) => item.type !== 1 && item.column !='cunshequmingcheng'
	);
	//替换字段名
	tableInfo.columns = tableInfo?.columns?.map((item:any)=>{
		if(item.name=='事项标题' || item.name=='事项内容')
		item.name = item.name.replace('事项','');
		return item;
	});
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
		border: 1px solid var(--dialog-border-color);
		.el-descriptions__label {
			width: 120px;
			flex-shrink: 0;
		}
		.el-dialog__body {
			border-top: 1px solid var(--dialog-border-color);
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
