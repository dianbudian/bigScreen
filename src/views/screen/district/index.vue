<template>
<!-- 区级 -->
	<div class="screen-page">
		<!-- 大标题 -->
		<header class="header">
			<b class="gradient-color screen-title">区级大屏管理</b>
		</header>

		<!-- 已选社区 -->
		<div></div>

		<!-- 未选社区 -->
		<div></div>

		<!-- 街镇 -->
		<div class="street-board">
			<div v-for="(item,index) in state.streetList" :key="index" :class="item.active ? 'item active': 'item'" :style="'transform: rotate('+ item.rotate +');'" @click="goStreetRotate(index)">
				<b>{{item.title}}</b>
			</div>
			<!-- <div class="item angle-re4">
				<b>五津街道</b>
			</div>
			<div class="item angle-re3">
				<b>普兴街道</b>
			</div>
			<div class="item angle-re2">
				<b>安西街道</b>
			</div>
			<div class="item angle-re1">
				<b>宝墩街道</b>
			</div>
			<div class="item angle-0 active">
				<b>花源街道</b>
			</div>
			<div class="item angle-1">
				<b>邓双街道</b>
			</div>
			<div class="item angle-2">
				<b>永商街道</b>
			</div>
			<div class="item angle-3">
				<b>花桥街道</b>
			</div>-->
		</div>

		<!-- 内容 -->
		<div>
			<!-- 数据区 -->
			<div></div>
			<!-- 功能区 -->
			<div></div>
		</div>

		<!-- 底部 -->
		<footer class="footer"></footer>
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
import { DiyReportApi, DiyDataApi } from "/@/api/sysApi";
import { formatDate } from "/@/utils/formatTime";

const state = reactive({
	streetActiveIndex: 4,
	streetList: [
		{ id: 1, title: "五津街道", active: false, rotate: "" },
		{ id: 2, title: "普兴街道", active: false, rotate: "" },
		{ id: 3, title: "安西街道", active: false, rotate: "" },
		{ id: 4, title: "宝墩街道", active: false, rotate: "" },
		{ id: 5, title: "花源街道", active: true, rotate: "" },
		{ id: 6, title: "邓双街道", active: false, rotate: "" },
		{ id: 7, title: "永商街道", active: false, rotate: "" },
		{ id: 8, title: "花桥街道", active: false, rotate: "" },
	],
});

onMounted(() => {
	goStreetRotate(state.streetActiveIndex);
});

const goStreetRotate = (index: number) => {
	state.streetActiveIndex = index;
	state.streetList[index].rotate = "0";
	state.streetList[index].active = true;
	//左侧
	for (let i = index - 1; i >= 0; i--) {
		let differ = index - i;
		state.streetList[i].rotate = "-" + differ * 15 + "deg";
		state.streetList[i].active = false;
	}
	//右侧
	for (let i = index + 1; i < state.streetList.length; i++) {
		let differ = i - index;
		state.streetList[i].rotate = differ * 15 + "deg";
		state.streetList[i].active = false;
	}
};
</script>
<style>
@font-face {
	font-family: "electronicFont";
	src: url("http://119.4.191.22:801/boercun/font/DS-DIGIT.TTF");
}
</style>
<style lang="scss">
body,
#app {
	height: 100%;
	overflow: hidden;
}
</style>
<style lang="scss" scoped>
:root {
	--mainColor1: #ffffff;
	--mainColor2: #3bdefb;
	--mainColor3: #cb7e2c;
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
	background-attachment: fixed;
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
@mixin gradientColor {
	background-image: linear-gradient(to bottom, #fff, #3bdefb);
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-color-active {
}
.angle-0 {
	transform: rotate(0);
}
.angle-re1 {
	transform: rotate(-15deg);
}
.angle-re2 {
	transform: rotate(-30deg);
}
.angle-re3 {
	transform: rotate(-45deg);
}
.angle-re4 {
	transform: rotate(-60deg);
}
.angle-re6 {
	transform: rotate(-75deg);
}
.angle-1 {
	transform: rotate(15deg);
}
.angle-2 {
	transform: rotate(30deg);
}
.angle-3 {
	transform: rotate(45deg);
}
.angle-4 {
	transform: rotate(60deg);
}
.angle-5 {
	transform: rotate(75deg);
}
// 大屏
@media screen and (max-width: 2268px) {
	.header {
		position: fixed;
		z-index: 0;
		left: 0;
		top: 0;
		width: 100%;
		height: 102px;
		background: url("/@/assets/images/district/top.png") center bottom
			no-repeat;
		background-size: auto 100%;
		text-align: center;
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
		left: 350px;
		top: 50%;
		.item {
			width: 161px;
			height: 67px;
			position: absolute;
			top: -33.5px;
			background: url("/@/assets/images/district/street.png") center
				center no-repeat;
			cursor: pointer;
			transform-origin: -350px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			color: #fff;
			transition: 0.3s;
			&:hover {
				b {
					@include gradientColor;
				}
			}
			&.active {
				background: url("/@/assets/images/district/street_active.png")
					center center no-repeat;
				::after {
					content: "";
					display: block;
					position: absolute;
					width: 28px;
					height: 28px;
					left: 170px;
					top: calc(50% - 14px);
					background: url("/@/assets/images/district/street_arrow.gif")
						center center no-repeat;
				}
			}
		}
	}
}
// 正常屏
@media screen and (max-width: 1920px) {
	.screen-page {
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
</style>
