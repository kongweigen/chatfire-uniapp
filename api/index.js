const http = uni.$u.http

export * from './image'
export * from './pay'
export * from './user'
export * from './video'
export * from './chat'


export const getTaskById = (id) => http.get(`/box/chat/task/${id}`)

export const getHot = () => http.get(`https://openai-dev.chatfire.cn/tools/v1/news/baidu`)

export const uploadFile = (params, config = {}) => http.post('/box/chat/file', params, config)
// 文字转语音
export const textToVoice = (params, config = {}) => http.post('/box/chat/speech', params, config)