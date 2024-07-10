
// let UPLOAD_URL = 'https://xjly.hbzg.cn';
// if (window.__env__?.VITE_UPLOAD_URL) { 
// 	UPLOAD_URL = window.__env__?.VITE_UPLOAD_URL;
// }
const UPLOAD_URL = window.__env__?.VITE_UPLOAD_URL;


//是否为上传文件
export const isUpload = (v: String) => {
	return v.includes("Upload");
}
//是否图片
export const isImg = (v: String) => {
	return v.includes(".jpg") || v.includes(".png") || v.includes(".gif") || v.includes(".jpeg")
}

export const isObjectOrArray = (value: any) => {
	if (value === null) return false;
	const type = Object.prototype.toString.call(value);
	if (type === '[object Array]') {
		return value.length > 0;
	} else if (type === '[object Object]') {
		return Object.keys(value).length > 0;
	}
	return false;
}

//获取第一张图片
export const getFirstImg = (jsonStr: any): String => {
	if (!jsonStr) return '';
	let json = [] as any;
	if (isObjectOrArray(jsonStr)) {
		json == jsonStr;
	} else {
		json = JSON.parse(jsonStr);
	}
	if (json.length && json[0]) {
		let targe = json[0];
		if (isObjectOrArray(json[0])) {
			targe = json[0].url;
		}
		return UPLOAD_URL + targe;
	}
};
// 补齐网络路径
export const fixedUploadURL = (imgs: Array<any>) => {
	if (imgs.length && imgs[0]) {
		let targe = imgs[0]
		if (typeof imgs[0] != 'string') {
			targe = imgs[0].url;
		}
		//网络路径不用处理
		if (targe.includes('http') && targe.includes('//')) {
			return imgs
		}
		//非网络路径添加网址
		return imgs.map((item: any) => {
			if (item?.url) {
				return UPLOAD_URL + item?.url;
			} else { 
				return UPLOAD_URL + item;
			}
		});
	}
	return [];
}

//图片数据转换
export const transformUploadData = (imgData: any): Array<any> => {
	let imgs: Array<string> = [] as any;
	if (Array.isArray(imgData)) {
		return fixedUploadURL(imgData);
	}
	if (imgData) {
		let jsonImgList = JSON.parse(imgData);
		return fixedUploadURL(jsonImgList);
	}
	return imgs;
};

export const joinArray = (value: any, separator: string = "/") => {
	if (value == "") { return '' }
	if (Array.isArray(value)) {
		return value.join(separator);
	} else {
		let _value = JSON.parse(value);
		return _value.join(separator);
	}
}

// 获取列类型
export const getColumnType = (value: any) => {

	//文本
	if (value === "" || value === undefined || value === null || !isNaN(Number(value))) {
		return "text";
	}
	//JSON
	if (Array.isArray(value)) {
		let target = value[0]?.url ?? value[0];
		if (target) {
			if (isUpload(target)) {
				if (isImg(target)) {
					return 'img';
				}
			}
		}
		return 'array';
	}
	//不是JSON,但是JSON字符串
	try {
		let _value = JSON.parse(value);
		let target = _value[0];
		if (target?.url) {
			if (isUpload(target?.url)) {
				if (isImg(target.url)) {
					return 'img';
				}
			}
		}
		if (target) {
			if (isUpload(target)) {
				if (isImg(target)) {
					return 'img';
				}
			}
		}
		return 'array';
	} catch (e) {
		return 'text'
	}
};

export default getColumnType