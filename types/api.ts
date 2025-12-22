import { endPoints } from "@/constants/api";
import { AxiosRequestConfig } from "axios";

export interface TraccarUser {
	id?: number | null;
	name: string;
	email: string;
	phone?: string;
	administrator: boolean;
	readonly: boolean;
	disabled: boolean;
	token?: string;
	expirationTime?: string;
	deviceLimit: number;
	userLimit: number;
}

export interface TraccarDevice {
	id: number;
	name: string;
	uniqueId: string;
	status: "online" | "offline" | "unknown";
	lastUpdate?: string;
	positionId?: number;
	groupId?: number;
	phone?: string;
	model?: string;
	contact?: string;
	category?: string;
	disabled: boolean;
	attributes?: Record<string, any>;
}

export interface TraccarPosition {
	id: number;
	deviceId: number;
	protocol: string;
	serverTime: string;
	deviceTime: string;
	fixTime: string;
	outdated: boolean;
	valid: boolean;
	latitude: number;
	longitude: number;
	altitude: number;
	speed: number;
	course: number;
	address?: string;
	accuracy: number;
	network?: any;
	attributes?: Record<string, any>;
}

export interface ApiError {
	message: string;
	statusCode?: number;
	data?: any;
}

export interface RequestConfig extends AxiosRequestConfig {
	showAlert?: boolean;
}

export interface ApiRequestParams {
	path: keyof typeof endPoints | string;
	pathComplement?: string;
	config?: RequestConfig;
	auth?: Record<string, string>;
}

export interface ApiRequestWithDataParams extends ApiRequestParams {
	data?: any;
}
