<template>
	<div class="filed-cell">
		<!-- 有传入插槽 -->
		<slot v-if="state.hasDefaultSlotContent" />

		<!-- 没有传入插槽 -->
		<template v-if="!state.hasDefaultSlotContent">
			<!-- 文件 file-viewer -->

			<!-- 图片 img-viewer -->
			<template v-if="state.columnType=='img'">
				<el-image fit="contain" class="img" style="width: 50px; height: 50px" :src="state.imgThumb" lazy :preview-src-list="state.imgSrcList" :preview-teleported="true">
					<template #error>
						<img src="/@/assets/images/nopic.jpg" style="width: 50px; height: 50px" class="error-img" />
					</template>
				</el-image>
				<span v-if="state.imgCount > 1">{{state.imgCount}}+</span>
			</template>

			<!-- 文字数组 arry-viewer -->
			<template v-else-if="state.columnType==='array'">{{joinArray(value)}}</template>

			<!-- 普通文本 text-viewer -->
			<template v-else>{{value ?? '--'}}</template>

			<!-- 标签 tag-viewer -->
		</template>

		<!-- <template #other>Other</template> -->
		<slot v-if="state.hasOtherSlotContent" name="other" />
	</div>
</template>

<script lang="ts" setup>
//v1版本，未拆分类型组件
//分发事件未添加
import {
	useSlots,
	defineComponent,
	computed,
	inject,
	onMounted,
	reactive,
	watch,
} from "vue";
import { isMobile } from "/@/utils/other";
import {
	joinArray,
	getColumnType,
	getFirstImg,
	transformUploadData,
} from "/@/utils/columnType";

const props = defineProps({
	row: {} as any,
	value: "" as any,
});
const uSlots = useSlots();
const state = reactive({
	hasDefaultSlotContent: false,
	hasOtherSlotContent: false,
	columnType: "text",
	imgThumb: [],
	imgSrcList: [],
	imgCount: 0,
});

onMounted(() => {
	//是否默认插槽内容
	state.hasDefaultSlotContent = !!useSlots().default;
	//是否其他插槽内容
	state.hasOtherSlotContent = !!useSlots().other;
	//字段处理
	dealField(props.value);
});
watch(
	() => props.value,
	(newValue: any) => {
		dealField(newValue);
	}
);
const dealField = (value: any) => {
	state.columnType = getColumnType(value);
	//图片的相关变量处理
	if (state.columnType === "img") {
		state.imgSrcList = transformUploadData(value);
		if (state.imgSrcList?.length) {
			state.imgThumb = state.imgSrcList[0];
		}
		// state.imgThumb = getFirstImg(props.value);
		// console.log("imgThumb---",state.imgThumb);
		state.imgCount = state.imgSrcList.length;
	}
};

</script> 

<style lang="scss" scoped>
</style>
