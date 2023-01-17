import axios from 'axios'

export const USER_API = axios.create({
    baseURL: "https://server.sayyarah.shop/",
})

export const USER_API_GET = USER_API.get;
export const USER_API_POST = USER_API.post;
export const USER_API_PUT = USER_API.put;

USER_API.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)
export const USER = axios.create({
    baseURL: "https://server.sayyarah.shop/",
})

export const USER_GET = USER.get;
export const USER_POST = USER.post;
export const USER_PUT = USER.put;

USER.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }
)

export const POSTS_API = axios.create({
    baseURL: "https://server.sayyarah.shop/post",
})



POSTS_API.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)

export const POSTS = axios.create({
    baseURL: "https://server.sayyarah.shop/post",
})

POSTS.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }
)

export const POSTS_GET = POSTS.get;
export const POSTS_POST = POSTS.post;




export const ADMIN = axios.create({
    baseURL: "https://server.sayyarah.shop/admin"
})

export const ADMIN_GET = ADMIN.get;
export const ADMIN_POST = ADMIN.post;
export const ADMIN_PUT = ADMIN.put;
export const ADMIN_DELETE = ADMIN.delete;


export const CHAT_API = axios.create({
    baseURL: "https://server.sayyarah.shop/chat"
})



CHAT_API.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)


export const MESSAGE_API = axios.create({
    baseURL: "https://server.sayyarah.shop/message"
})

MESSAGE_API.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)

export const MESSAGE_API_GET = MESSAGE_API.get;
export const MESSAGE_API_POST = MESSAGE_API.post;