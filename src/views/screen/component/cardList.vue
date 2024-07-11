<template>
	<!-- 表单卡片列表 -->
	<div>
		<el-card class="mobile-card-item" v-for="item in tableData" :key="item.id">
			<div class="field-item" v-for="(col, columnIndex) in columnParams??[]" :key="columnIndex" :style="styleCoums(item,columnIndex)">
				<el-text type="info" class="field-title">{{ col.name }}：</el-text>
				<FiedViewer :row="item" :value="item[col.column]" style="color: #fff"></FiedViewer>
			</div>
			<template #footer v-if="columnParams?.length > 10">
				<div class="text-center" :style="{ color: item.isToggle ? 'var(--el-color-info)' : 'var(--el-color-primary)' }" @click="handleToggle(item)">
					<span>{{ item.isToggle ? '收起查看' : '展开查看' }}</span>
					<SvgIcon :name="item.isToggle ? 'ele-ArrowUp' : 'ele-ArrowDown'" />
				</div>
			</template>
		</el-card>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, watch, reactive } from 'vue';
import FiedViewer from "../../components/fieldViewer/fieldViewer.vue";

const props = defineProps({
	//表单卡片数据
	tableData: {
		type: Object,
		default: () => {
			return [] as any;
		},
	},
	//列参数
	columnParams: {
		type: Object,
		default: () => {
			return [];
		},
	},
});

const state = reactive({

});
onMounted(async () => {});

//展开收起
const handleToggle = (item: any) => {
	item.isToggle = !item.isToggle;
};
const styleCoums=(item:any,columnIndex:any)=>{
	return { display: !item.isToggle && (columnIndex < 10) ? 'flex' : item.isToggle ? 'flex' : 'none' }
}
</script>
<style lang="scss" scope>
.mobile-card-item {
	margin-top: 10px;
}
.field-item {
	
	display: flex;
	justify-content: space-between;
	padding: 5px 0;
	border-top: 1px #ccc6 dashed;
	&:nth-child(1) {
		border-top: none;
	}
	.field-title {
		flex-shrink: 0;
	}
	.field-value {
	}
}
</style>