import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { url } from "inspector";
import { resolve } from "path";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

// Use an Axios interceptor to sdo something when we get a response form the API
axios.interceptors.response.use(async (response) => {
  // Call sleep function and use 'then' (because we a re getting a promise returned)
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  // Takes a url which is a string. Passes it to axios which then returns the required url
  // Below passes responseBody to the data above which contains our activities
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"), // url will be baseURL + this
  details: (id: string) => requests.get<Activity>(`/activities/${id}`), // Details of the activity
  create: (activity: Activity) => requests.post<void>("/activities", activity),
  update: (activity: Activity) =>
    axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
