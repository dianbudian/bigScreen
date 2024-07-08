<template>
	<div class="page boer-dialog">
		<el-dialog v-model="state.isShowDialog" :close-on-click-modal="false" :fullscreen="$isMobile?true:false" width="600" height="80%" @close="closeDialog">
			<template #header>
				<div style="color: #fff; text-align:center">
					<span>发起质疑</span>
				</div>
			</template>
			<el-form ref="ruleFormRef" :model="state.formData" label-width="auto" style="max-width: 600px">
				<el-form-item label="姓名" label-width="120">
					<el-input v-model="state.formData.xingming" placeholder="请输入姓名" />
				</el-form-item>
				<el-form-item label="联系电话" label-width="120">
					<el-input v-model="state.formData.lianxidianhua" placeholder="请输入联系电话" />
				</el-form-item>
				<el-form-item label="质疑内容" prop="neirong"  label-width="120" :rules="[
							{ required: true, message: '内容必填', trigger: 'blur', }
						]">
					<el-input type="textarea" v-model="state.formData.neirong" :rows="5" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item>
					<div class="flex flex-jc-center w100 mt10">
						<el-button type="primary" @click="onSubmit(ruleFormRef)">保存</el-button>
						<el-button @click="closeDialog">取消</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
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
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
// import { debounce } from 'lodash';
import { getAPI } from "/@/utils/request";
import {
	DiyReportApi,
	DiyDataApi,
	LargeScreenApi,
	WeatherApi,
	loadApi
} from "/@/api/sysApi";

const { proxy } = getCurrentInstance();
const $isMobile = proxy.$isMobile;
const ruleFormRef = ref(null);
const state = reactive({
	loading: false,
	isShowDialog: false,
	tableInfo: {} as any,
	formData: { xingming: '', lianxidianhua: '', wentineirong: '' } as any,
});
onMounted(() => {});

// banlizhuangtai: "已回复"
// cunshequmingcheng: "[\"新津区\",\"花桥街道\",\"黄桷树社区\"]"
// huifuneirong: "已联系自来水公司办理，自来水公司于6月接水管解决水压问题"
// lianxidianhua: "13808208993"
// wentineirong: "反映棉花沱小区3楼以上自来水水压不够，用水困难要求解决。"
// xingming: "蔡家英"

const openDialog = (tableInfo: any) => {
	state.formData = { xingming: '', lianxidianhua: '', wentineirong: '' };
	state.tableInfo = tableInfo;
	state.isShowDialog = true;
};
const closeDialog = () => {
	state.isShowDialog = false;
};

const onSubmit = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			saveQuestion();
		} else {
			ElMessage({ showClose: true, message: '内容必填', type: 'warning' });
		}
	});
};

const saveQuestion = async() => {
	state.formData.huifuzhuangtai = '未回复';
	let params = {
		fields: {
			...state.formData,
			CreateUserId: 0,
			CreateUserName: '无',
		},
	};
	state.loading = true;
	//无登录新增
	await getAPI(loadApi)
		.diyTableData(state.tableInfo?.tableId, params)
		.then((res) => {
			const { data } = res;
			if (data.code == 200) {
				ElMessage({ showClose: true, message: '提交成功', type: 'success' });
				closeDialog();
			}
			state.loading = false;
		});
	
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
		.el-dialog__body {
			border-top: 1px solid #1ecfa1;
		}
		.el-dialog__footer {
			background-color: #242424;
		}

		.el-form-item__label {
			color: #999;
		}
		.el-input__wrapper,
		.el-textarea__inner {
			background-color: rgb(26 46 51 / 53%) !important;
			box-shadow: none;
			color: #fff;
		}
		.el-input__inner {
			color: #fff;
		}
	}
}
</style>
