import axios, { AxiosError } from 'axios';
import * as queryString from 'querystring';
import { LocalStorage } from 'node-localstorage';
import { RegisterDto } from '../dto/RegisterDto';

const config = {
    baseURL: 'https://api.supermetrics.com/assignment/',
    timeout: 10000,
};

const localStorage = new LocalStorage('./scratch');

const client = axios.create(config);

const updateToken = () => {
    console.log('update token');
    return client.post<RegisterDto>('/register', {
        client_id: process.env.client_id,
        email: process.env.email,
        name: process.env.name,
    });
}

export const assignmentClient = axios.create(config);

const getToken = () => localStorage.getItem('token');

assignmentClient.interceptors.request.use(
    async (config) => {
        const search = config.url.match(/\?(.*)/)?.[1];
        const url = config.url.match(/(.*)(\?)/)?.[1] ?? config.url;

        const searchObject = queryString.parse(search);
        let token = getToken();
        if (!token) {
            console.log('token is not found');
            try {
                const { data } = await updateToken();
                localStorage.setItem('token', data.data.sl_token);
                token = data.data.sl_token;
            } catch (e) {
                if (e instanceof AxiosError && e.response && e.response.data) {
                    return Promise.reject(e.response.data);
                }
                return Promise.reject(e);
            }
        }

        searchObject.sl_token = token;
        config.url = `${url}?${queryString.stringify(searchObject)}`;

        return config;
    },
    (error) => Promise.reject(error),
);

assignmentClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalConfig = error.config;
        if (error.response) {
            if (
                error.response.status === 401 &&
                !originalConfig._retry
            ) {
                console.log('401');
                originalConfig._retry = true;
                try {
                    const { data } = await updateToken();
                    localStorage.setItem('token', data.data.sl_token);
                    return assignmentClient(originalConfig);
                } catch (e) {
                    return Promise.reject(e);
                }
            }
        }

        return Promise.reject(error);
    },
);
