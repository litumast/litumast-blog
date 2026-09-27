import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题，留空则走i18n默认标题
	title: "",

	// 公告内容
	content: "愿你效仿韩立的和光同尘，王林的逆修踏天，石昊的独断万古。	借用韩立的话：“或许就是因为出身平凡，所以遇见任何能改变自己命运的机会时才会抓的更牢，这没什么可耻的。”",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "了解更多",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
