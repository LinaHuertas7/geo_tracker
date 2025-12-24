import { BASE_URL, endPoints } from "@/constants/api";
import { ApiRequestParams, ApiRequestWithDataParams } from "@/types/api";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	withCredentials: true,
	headers: {
		Accept: "application/json",
	},
});

const buildUrl = (
	path: keyof typeof endPoints | string,
	pathComplement = ""
): string => {
	const basePath =
		typeof path === "string" && path in endPoints
			? endPoints[path as keyof typeof endPoints]
			: path;
	return `${basePath}${pathComplement}`;
};

export const get = async <T = any>({
	path,
	pathComplement = "",
	config = {},
	auth = {},
}: ApiRequestParams): Promise<T> => {
	try {
		const { ...axiosConfig } = config;
		const url = buildUrl(path, pathComplement);
		let headers = axiosConfig.headers || {};

		if (auth) {
			headers = { ...headers, ...auth };
		}
		const response: AxiosResponse<T> = await axiosInstance.get(url, {
			...axiosConfig,
			headers,
		});
		return response.data;
	} catch (error: any) {
		throw error;
	}
};

export const post = async <AxiosResponse>({
	path,
	pathComplement = "",
	data,
	config = {},
	auth = {},
}: ApiRequestWithDataParams): Promise<AxiosResponse> => {
	try {
		const { ...axiosConfig } = config;
		const url = buildUrl(path, pathComplement);

		let requestData = data;
		let headers = axiosConfig.headers || {};

		if (auth) {
			headers = { ...headers, ...auth };
		}

		if (data instanceof FormData) {
			requestData = {};
			data.forEach((value, key) => {
				requestData[key] = value;
			});
			headers["Content-Type"] = "application/x-www-form-urlencoded";
		} else {
			headers["Content-Type"] = "application/x-www-form-urlencoded";
		}

		const response: AxiosResponse = await axiosInstance.post(
			url,
			requestData,
			{ ...axiosConfig, headers }
		);
		return response;
	} catch (error: any) {
		throw error;
	}
};
