<template>
	<div class="page boer-dialog">
		<el-dialog v-model="state.isShowDialog" :lock-scroll="true" :close-on-click-modal="false" :fullscreen="$isMobile?true:false" width="80%" height="80%" @close="closeDialog">
			<template #header>
				<div style="color: #fff; text-align:center">
					<span v-if="state.pageTitle">{{state.pageTitle}}</span>
					<span v-else>{{state.tableInfo.tableName}}</span>
				</div>
			</template>
			<!-- 移动端卡片 -->
			<div v-if="$isMobile">
				<cardList :tableData="state.tableData" :columnParams="state.tableInfo.columns" />
			</div>
			<!-- pc端Table -->
			<el-table v-else ref="tableRef" v-loading="state.loading" element-loading-text="加载" :data="state.tableData" :border="true" height="700" fit highlight-current-row tooltip-effect="dark">
				<el-table-column align="center" :label="col.name" v-for="(col,index) in state.tableInfo.columns" :key="index">
					<template #default="scope">
						<FiedViewer :row="scope.row[col.column]" :value="scope.row[col.column]"></FiedViewer>
					</template>
				</el-table-column>
				<el-table-column align="center" label="查看" width="100">
					<template #default="scope">
						<el-link @click="openDetail(scope.row)">查看详情</el-link>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				v-model:current-page="state.tableParams.page"
				v-model:page-size="state.tableParams.pageSize"
				size="small"
				:disabled="false"
				layout="prev, pager, next, jumper"
				:total="state.tableParams.total"
				@current-change="handleCurrentChange"
			/>
			<!-- <template #footer>共 {{state.tableParams.total}} 条</template> -->
		</el-dialog>
		<!-- 图片预览组件 -->
		<el-image-viewer v-if="state.isViewer" :urlList="state.pics" @close="closeViewer" :zIndex="9999"></el-image-viewer>
		<DetailDialog ref="detailDialogRef"></DetailDialog>
	</div>
</template>

<script lang="ts" setup>
import {
	onMounted,
	reactive,
	ref,
	getCurrentInstance,
	defineAsyncComponent,
} from "vue";
import { getAPI } from "/@/utils/request";
import { LargeScreenApi } from "/@/api/sysApi";
import { isMobile } from "/@/utils/other";
import {
	getColumnType,
	getFirstImg,
	transformUploadData,
} from "/@/utils/columnType";

const { proxy } = getCurrentInstance();
const $isMobile = isMobile();
const cardList = defineAsyncComponent(() => import("./cardList.vue"));
const DetailDialog = defineAsyncComponent(() => import("./detailDialog.vue"));
const detailDialogRef = ref(null);
import FiedViewer from "../../components/fieldViewer/fieldViewer.vue";

const state = reactive({
	loading: false,
	isShowDialog: false,
	isViewer: false, //图片预览
	pics: [],
	pageTitle: "" as String,
	tableInfo: {} as any,
	tableData: [] as Array<[any]>,
	tableParams: {
		page: 1,
		pageSize: 20,
		total: 0 as any,
		tableId: "",
	},
});
onMounted(() => {});

//翻页
const handleCurrentChange = (v: Number) => {
	state.tableParams.page = v;
	handleTable();
};
const showViewer = (pics: any) => {
	state.pics = pics;
	state.isViewer = true;
};
const closeViewer = () => {
	state.isViewer = false;
	state.pics = [];
};
//字段脱敏
const dealField = (v: any, col: any) => {
	if (v) {
		if (col.sensitive == "realName") {
			v = v.substr(0, 1) + "**";
		}
		if (col.sensitive == "phone") {
			v = v.substr(0, 4) + "****" + v.substr(-4, 4);
		}
	}
	if (v == 0 && col.key == "shichang") {
		v = "--";
	}
	return v;
};
const openDetail = (row: any) => {
	detailDialogRef.value.openDialog(state.tableInfo, row);
};
const openDialog = (
	tableInfo: any,
	title: String,
	tableParams?: Object | undefined
) => {
	tableInfo.columns = tableInfo.columns.filter(
		(item: any) => item.type !== 1
	);
	state.pageTitle = title;
	state.tableInfo = tableInfo;
	if (tableParams) {
		for (const key in tableParams) {
			state.tableParams[key] = tableParams[key];
		}
	}
	state.tableParams.tableId = tableInfo.tableId;

	state.isShowDialog = true;
	handleTable();
};
const closeDialog = () => {
	state.isShowDialog = false;
};
// 查询操作
const handleTable = async () => {
	state.loading = true;
	const { data } = await getAPI(LargeScreenApi).getPage(state.tableParams);
	state.tableData = data.result?.items;
	state.tableParams.total = data.result.total;
	state.loading = false;
};

// 导出对象
defineExpose({ openDialog });
</script>
<style lang="scss" scoped>
.el-table {
	--el-table-border-color: #141414;
	background-color: #000;
}
.current-row {
	background-color: #000;
}
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
		border: 1px solid #27acc6;
		margin-top: 10vh;
		.el-dialog__body {
			border-top: 1px solid #27acc6;
		}
		.el-dialog__footer {
			background-color: #242424;
		}
		.el-table {
			thead {
				color: #69778f;
			}
			tr {
				background-color: rgb(26 46 51 / 53%) !important;
			}

			.el-table__row {
				color: #adadad;
			}
			.el-table__body tr.current-row > td.el-table__cell {
				background-color: rgb(26 46 51 / 73%) !important;
			}

			td.el-table__cell,
			th.el-table__cell.is-leaf {
				background: transparent;
				border-bottom: 1px rgb(16 35 31) solid;
				color: #ced7e4;
			}
			&.el-table--enable-row-hover
				.el-table__body
				tr:hover
				> td.el-table__cell {
				background-color: transparent;
			}
		}
		//翻页
		.el-pagination {
			margin-top: 5px;
			text-align: right;
			justify-content: flex-end;
			.el-input__wrapper {
				background: none;
			}
			button {
				background: none;
				color: #999;
				&:hover {
					color: #27acc6;
				}
			}
			button.is-disabled,
			button:disabled {
				background: none;
			}
			.el-pager li {
				color: #999;
				background: #9995;
				&.is-active {
					background: #9992;
				}
				&:hover {
					color: #27acc6;
				}
			}
		}
	}
}
//移动端样式
@media screen and (max-width: 768px) {
	.boer-dialog {
		:deep(.el-dialog__body) {
			padding: 0 !important;
			max-height: calc(100vh - 95px) !important;
			.el-card {
				background-color: rgb(13 34 40 / 83%) !important;
				border: 0;
			}
		}
	}
}
</style>
