<template>
	<div>
		<img :src="pics[0]" @click="showViewer" />
        <!-- 图片预览组件 -->
		<el-image-viewer v-if="isViewer" :urlList="pics" @close="closeViewer" :zIndex="9999"></el-image-viewer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	setup() {},
	name: "imgViewer",
	components: {},
    props: {
		pics: [] as any,
	},
	data() {
		return {
			isViewer: false,
		};
	},
	watch: {},
	provide() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
		changeEvents(val: any) {},
		showViewer() {
			this.isViewer = true;
		},
		closeViewer() {
			this.isViewer = false;
			this.pics = [];
		},
	},
});
</script> 

<style lang="scss" scoped>
</style>
