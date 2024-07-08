/*
 * @Date: 2024-04-01 11:01:50
 * @FilePath: \WEB\src\types\mitt.d.ts
 */
/**
 * mitt 事件类型定义
 *
 * @method openSetingsDrawer 打开布局设置弹窗
 * @method restoreDefault 分栏布局，鼠标移入、移出数据显示
 * @method setSendColumnsChildren 分栏布局，鼠标移入、移出菜单数据传入到 navMenu 下的菜单中
 * @method setSendClassicChildren 经典布局，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
 * @method getBreadcrumbIndexSetFilterRoutes 布局设置弹窗，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
 * @method layoutMobileResize 浏览器窗口改变时，用于适配移动端界面显示
 * @method openOrCloseSortable 布局设置弹窗，开启 TagsView 拖拽
 * @method openShareTagsView 布局设置弹窗，开启 TagsView 共用
 * @method onTagsViewRefreshRouterView tagsview 刷新界面
 * @method onCurrentContextmenuClick tagsview 右键菜单每项点击时
 * @method SystemmodelItemClick 桌面背景图片切换
 * 
 * @method Analysischart 图表文件重加载 暂时保留
 * @method mittBusUpdateData mittBUs更新数据模块 工作台 
 * @method SystemmodelType 桌面模式 1 经典 2 桌面
 */
declare type MittType<T = any> = {
	openSetingsDrawer?: string;
	SystemmodelItemClick?:string;
	Analysischart?:number;
	mittBusUpdateData?:number | string;
	SystemmodelType?:number;
	restoreDefault?: string;
	setSendColumnsChildren: T;
	setSendClassicChildren: T;
	getBreadcrumbIndexSetFilterRoutes?: string;
	layoutMobileResize: T;
	openOrCloseSortable?: string;
	openShareTagsView?: string;
	onTagsViewRefreshRouterView?: T;
	onCurrentContextmenuClick?: T;

	// 自定义
	submitRefresh?: string; // 通用编辑提交刷新
	submitRefreshDictData?: string; // 字典编辑提交刷新
	submitRefreshTable?: string; // 库表管理表刷新
	submitRefreshColumn?: string; // 库表管理列刷新
	addTableSubmitted?: string; // 库表管理增加表刷新
	submitRefreshFk?: string; // 代码生成主键刷新

	uploadCropperImg?: any; // 上传裁剪图片

	noticeRead: number; // 消息已读事件

	
	submitRefreshTableClass?: string; // 表单分类编辑提交刷新

	chooseUser?: any; // 选择用户

	openFixDialog?: any; // 打开布置事项弹窗

	openOprPwdConfirm?: any; // 检查操作密码
	openTreasure?: any; // 打开百宝箱

	menuListData?: any; // 传输菜单树数据


	mobileOprBtn:?any;//移动端操作按钮
};

// mitt 参数类型定义
declare type LayoutMobileResize = {
	layout: string;
	clientWidth: number;
};

// mitt 参数菜单类型
declare type MittMenu = {
	children: RouteRecordRaw[];
	item?: RouteItem;
};
