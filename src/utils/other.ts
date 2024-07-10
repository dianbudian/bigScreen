import { nextTick, defineAsyncComponent } from 'vue';
import type { App } from 'vue';
import * as svg from '@element-plus/icons-vue';
import router from '/@/router/index';
import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { i18n } from '/@/i18n/index';
// import { Local } from '/@/utils/storage';
import { verifyUrl } from '/@/utils/toolsValidate';

// 引入组件
// const SvgIcon = defineAsyncComponent(() => import('/@/components/svgIcon/index.vue'));

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
// export function elSvg(app: App) {
// 	const icons = svg as any;
// 	for (const i in icons) {
// 		app.component(`ele-${icons[i].name}`, icons[i]);
// 	}
// 	app.component('SvgIcon', SvgIcon);
// }

/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export function useTitle() {
	const stores = useThemeConfig(pinia);
	const { themeConfig } = storeToRefs(stores);
	nextTick(() => {
		let webTitle = '';
		let globalTitle: string = themeConfig.value.globalTitle;
		const { path, meta } = router.currentRoute.value;
		if (path === '/login') {
			webTitle = <string>meta.title;
		} else {
			webTitle = setTagsViewNameI18n(router.currentRoute.value);
		}
		document.title = `${webTitle} - ${globalTitle}` || globalTitle;
	});
}

/**
 * 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @param params 路由 query、params 中的 tagsViewName
 * @returns 返回当前 tagsViewName 名称
 */
export function setTagsViewNameI18n(item: any) {
	let tagsViewName: string = '';
	const { query, params, meta } = item;
	// 修复tagsViewName匹配到其他含下列单词的路由
	const pattern = /^\{("(zh-cn|en|zh-tw)":"[^,]+",?){1,3}}$/;
	if (query?.tagsViewName || params?.tagsViewName) {
		if (pattern.test(query?.tagsViewName) || pattern.test(params?.tagsViewName)) {
			// 国际化
			const urlTagsParams = (query?.tagsViewName && JSON.parse(query?.tagsViewName)) || (params?.tagsViewName && JSON.parse(params?.tagsViewName));
			tagsViewName = urlTagsParams[i18n.global.locale.value];
		} else {
			// 非国际化
			tagsViewName = query?.tagsViewName || params?.tagsViewName;
		}
	} else {
		// 非自定义 tagsView 名称
		tagsViewName = i18n.global.t(meta.title);
	}
	//处理tagview文字超出问题
	return tagsViewName?.length > 10 ? tagsViewName.slice(0, 10) + '...' : tagsViewName;
}

/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export const lazyImg = (el: string, arr: EmptyArrayType) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					if (arr[key]?.loading) { 
						arr[key]['loading']	= false;
					}
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};

/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
// export const globalComponentSize = (): string => {
// 	const stores = useThemeConfig(pinia);
// 	const { themeConfig } = storeToRefs(stores);
// 	return Local.get('themeConfig')?.globalComponentSize || themeConfig.value?.globalComponentSize;
// };

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: EmptyObjectType) {
	let newObj: EmptyObjectType;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (obj[attr] && typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
	if (navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @description @感谢大黄
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
export function handleEmpty(list: any) {
	const arr = [];
	for (const i in list) {
		const d = [];
		for (const j in list[i]) {
			d.push(list[i][j]);
		}
		const leng = d.filter((item) => item === '').length;
		if (leng !== d.length) {
			arr.push(list[i]);
		}
	}
	return arr;
}
/**
 * 去掉转义字符
 * @param val 当前字符串
 */
export function excludeSpecial(val: string) {
	let pattern = new RegExp("[`~%!@#^=''?~《》！@#￥……&——‘”“'？*()（），,/。.、<> ]");
	let rs = "";
	for (let i = 0; i < val.length; i++) {
		rs += val.substr(i, 1).replace(pattern, '');
	}
	return rs;
}
/**
 * 打开外部链接
 * @param val 当前点击项菜单
 */
export function handleOpenLink(val: any) {
	const { origin, pathname } = window.location;
	router.push(val.path);
	if (verifyUrl(<string>val.meta?.isLink)) window.open(val.meta?.isLink);
	else window.open(`${origin}${pathname}#${val.meta?.isLink}`);
}

/**
 * 处理json字符串
 * @param val 当前点击项菜单
 */
export function handleJsonString(val: string)  {
	if (Array.isArray(val)) {
		return val;
	} else {
		try {
			if (JSON.parse(val)) {
				return JSON.parse(val);
			}
		} catch (e) {
			return val == '[]' ? [] : val;
		}
	}
}
/**
 * 判断是一维数组还是二维数组
 * @param arr 当前点击项菜单
 */
export function isArrayOneOrTwoDimensional(arr: any)  {
	if (Array.isArray(arr) && Array.isArray(arr[0])) {
		return "二维数组";
	  } else if (Array.isArray(arr)) {
		return "一维数组";
	  } else {
		return "不是数组";
	  }
}
/**
 * 生成id
 * @returns 
 */
export const generateId = function() {
	return Math.floor(Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000);
};


export const calcTableColWidth=function(label:any){
	let flexWidth = 0;
	for (const char of label) {
	  if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
		// 如果是英文字符，为字符分配8个单位宽度
		flexWidth += 8;
	  } else if (char >= "\u4e00" && char <= "\u9fa5") {
		// 如果是中文字符，为字符分配20个单位宽度
		flexWidth += 20;
	  } else {
		// 其他种类字符，为字符分配10个单位宽度
		flexWidth += 10;
	  }
	}
	if (flexWidth < 50) {
	  // 设置最小宽度
	  flexWidth = 100;
	}
	else if (flexWidth > 650) {
	  // 设置最大宽度
	  flexWidth = 650;
	}
	return flexWidth + "px";
}
// 根据内容计算宽度
export const flexColumnWidth=(item:any, tableData:any=[], flag:any)=> {
	// str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
	// flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
	// flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
	let str = item.prop;
	str = str + "";
	let columnContent = "";
	if (
		!tableData ||
		!tableData.length ||
		tableData.length === 0 ||
		tableData === undefined
	) {
		return;
	}
	if (!str || !str.length || str.length === 0 || str === undefined) {
		return;
	}
	if (flag === "equal") {
		// 获取该列中第一个不为空的数据(内容)
		for (let i = 0; i < tableData.length; i++) {
			if (tableData[i][str].length > 0) {
				columnContent = tableData[i][str] + "";
				break;
			}
		}
	} else {
		// 获取该列中最长的数据(内容)
		let index = 0;
		for (let i = 0; i < tableData.length; i++) {
			if (tableData[i][str] === null) {
				// 当数据为空时跳过本次循环获取下一条数据长度
				continue;
			}
			const now_temp = tableData[i][str] + "";
			const max_temp = tableData[index][str] + "";
			if (now_temp.length > max_temp.length) {
				index = i;
			}
		}
		columnContent = tableData[index][str] + "";
	}
	// 以下分配的单位长度可根据实际需求进行调整
	let flexWidth = 0;
	if (columnContent != undefined) {
		flexWidth=parseFloat(calcTableColWidth(columnContent)?.split('px')[0]);
	}
	let labelWidth = 0;
	labelWidth = parseFloat(calcTableColWidth(item.label)?.split('px')[0])+(item.sortable?40:0);
	
	//如果表头的宽度大于了内容的就取表头的值
	if (labelWidth > flexWidth) {
		flexWidth = labelWidth;
	}
	if (flexWidth > 650) {
		// 设置最大宽度
		flexWidth = 650;
	}
	return flexWidth + "px";
}
/**
 * 根据身份证号取 出生日期 || 年龄 ||性别 
 * @returns 
 */
export const getIdCardVal=function(IdCard:any, type:number) {
	var len = (IdCard + "").length;
	if (len == 0) {
	  return '';
	}
	else if (len != 18) { //身份证号码只能为15位或18位其它不合法 
	  return '';
	}
	if (type === 1) {
	  //获取出生日期
	  let birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14)
	  return birthday
	}
	else if (type === 2) {
	  //获取性别
	  if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
		return "男"
	  } else {
		return "女"
	  }
	}
	else if (type === 3) {
	  //获取年龄
	  var ageDate = new Date()
	  var month = ageDate.getMonth() + 1
	  var day = ageDate.getDate()
	  var age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1
	  if (IdCard.substring(10, 12) < month || IdCard.substring(10, 12) === month && IdCard.substring(12, 14) <= day) {
		age++
	  }
	  if (age <= 0) {
		age = 1
	  }
	  return age
	}
	return '';
  }
  //生成UUID
  export const getUUID = () => {
	const temp_url = URL.createObjectURL(new Blob());
	const uuid = temp_url?.toString(); 
	URL.revokeObjectURL(temp_url);
	return uuid.substring(uuid?.lastIndexOf("/") + 1);
  }
  
  //获取地址栏参数
  export const getUrlParam=(url:string)=> {
	var reg = new RegExp("(^|&)" + url + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	let r = window.location.search.substring(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
  }
/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method setTagsViewNameI18n 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize() element plus 全局组件大小
 * @method deepClone 对象深克隆
 * @method isMobile 判断是否是移动端
 * @method handleEmpty 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @method handleOpenLink 打开外部链接
 */
const other = {
	// elSvg: (app: App) => {
	// 	elSvg(app);
	// },
	useTitle: () => {
		useTitle();
	},
	
	lazyImg: (el: string, arr: any) => {
		lazyImg(el, arr);
	},
	globalComponentSize: () => {
		// return globalComponentSize();
	},
	deepClone: (obj: any) => {
		return deepClone(obj);
	},
	isMobile: () => {
		return isMobile();
	},
	handleEmpty: (list: any) => {
		return handleEmpty(list);
	},
	handleOpenLink: (val: any) => {
		handleOpenLink(val);
	},
	excludeSpecial: (val: string) => {
		return excludeSpecial(val);
	},
	handleJsonString: (val: string) => {
		return handleJsonString(val);
	},
	isArrayOneOrTwoDimensional: (val: string) => {
		return isArrayOneOrTwoDimensional(val);
	},

	calcTableColWidth: (val: string) => {
		return calcTableColWidth(val);
	},
	getUUID: () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	getUrlParam:(url:string)=>{
		return getUrlParam(url);
	},
	letterRegex:(val:string)=>{
		const regex = /^[a-zA-Z]/;
		return regex.test(val);
	},
	generateId:()=>{
		return generateId();
	}
	
};

// 统一批量导出
export default other;
