// 创建响应式数据
export const menuMock = [{
		subItems: [{
				value: 'clear',
				label: '图片清晰',
				subLabel: '高清修复新科技，专业修图师同款',
			},
			{
				value: 'watermark',
				label: '去除水印',
				subLabel: '水印去除新科技，专业修图师同款',
			},
			{
				value: 'expand',
				label: 'AI扩图',
				subLabel: '神奇扩图新科技，专业修图师同款',
			},
			{
				value: 'draw',
				label: 'AI重绘',
				subLabel: 'AI重绘新科技，专业修图师同款',
			},
			{
				value: 'style',
				label: '风格转换',
				subLabel: '风格转换新科技，专业修图师同款',
			}
		],
		itemclass: '图文创意'
	},
	// {
	// 	subItems: [{
	// 			value: 'lock',
	// 			label: 'AI翻译'
	// 		},
	// 		{
	// 			value: 'star',
	// 			label: '作业助手'
	// 		},
	// 		{
	// 			value: 'star',
	// 			label: '课件助手'
	// 		},
	// 		{
	// 			value: 'photo',
	// 			label: '论文助手'
	// 		},
	// 		{
	// 			value: 'photo',
	// 			label: '编程助手'
	// 		},
	// 		{
	// 			value: 'photo',
	// 			label: '简历助手'
	// 		},
	// 		{
	// 			value: 'photo',
	// 			label: '商品文案'
	// 		},
	// 		{
	// 			value: 'photo',
	// 			label: '短视频文案'
	// 		}
	// 	],
	// 	itemclass: '办公助手'
	// }
];
export const historyMock = [{
		img: '/static/chatFireLogo.png'
	},
	{
		img: '/static/chatFireLogo.png'
	},
	{
		img: '/static/chatFireLogo.png'
	}
];
export const createItemMock = [{
		src: '/static/picAi.png',
		label: '图片创作'
	},
	{
		src: '/static/video.png',
		label: '视频创作'
	}
];

export const routerUrlMap = {
	'clear': '/pages/image-clear/index',
	"picDesign": '/pages/design/index',
	'videoDesign': '/pages/design/index',
	'fireChat': "/pages/chat/index",
}

export const imageRecommendPrompt = [{
		label: "小男孩",
		desc: "帅气小男孩，黑头发，微笑，正脸，全身照，完美光线，油画风格，细节清晰",
	},
	{
		label: "神秘女巫",
		desc: "动漫3D风格，超写实油画，神秘女巫在森林中施展魔法，五官清晰，辛烷渲染，光线追踪，景深，超级细节",
	},
	{
		label: "兔子",
		desc: "可爱的小兔子，动漫3D风格，超写实油画，五官精致，透明感，光线追踪，景深，超级细节",
	},
	{
		label: "糖醋排骨",
		desc: "糖醋排骨，吉卜力风格，笔触，最好的质量，超细节",
	},
]

export const modelOptions = [{
		label: "可灵",
		value: "kling",
	},
	{
		label: "dall-e-3",
		value: "dall-e-3",
	},
	{
		label: "step-1x-medium",
		value: "step-1x-medium",
	},
	{
		label: "flux-pro",
		value: "flux-pro",
	},
	{
		label: "flux-pro-max",
		value: "flux-pro-max",
	},
	{
		label: "stable-diffusion-3",
		value: "stable-diffusion-3",
	},
]

export const voiceSoundOptions = [
  "晓晓",
  "女声",
  "晓伊",
  "云健",
  "云希",
  "男声",
  "云夏",
  "云扬",
  "辽宁晓北",
  "陕西晓妮",
]
