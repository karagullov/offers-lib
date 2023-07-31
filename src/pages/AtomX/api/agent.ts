import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "/api";
// axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: any) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: any) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string, body?: any) =>
    axios.delete<T>(url, body && { data: body }).then(responseBody),
};

export const prefixedRequests = (prefix: string) => ({
  get: <T>(url: string) => requests.get<T>(`${prefix}${url}`),
  post: <T>(url: string, body: any) =>
    requests.post<T>(`${prefix}${url}`, body),
  put: <T>(url: string, body: any) => requests.put<T>(`${prefix}${url}`, body),
  del: <T>(url: string, body?: any) => requests.del<T>(`${prefix}${url}`, body),
});
