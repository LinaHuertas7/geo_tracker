import { get } from "@/services/httpServiceAxios";
import { ApiError, TraccarDevice, TraccarPosition } from "@/types/api";
import { create } from "zustand";
import useAuthStore from "./authStore";

interface AuthState {
	devices: TraccarDevice[] | [];
	loading: boolean;
	error: ApiError | null;
	selectedDevice: TraccarDevice | null;
	devicePositions: TraccarPosition[] | [];

	getDevices: () => Promise<void>;
	selectDevice: (device: TraccarDevice | null) => Promise<void>;
	getLastKnownLocation: (positionId: number) => Promise<void>;
	updateDevice: (updatedDevice: TraccarDevice) => void;
}

const useDevicesStore = create<AuthState>()((set) => ({
	devices: [],
	selectedDevice: null,
	loading: false,
	error: null,
	devicePositions: [],

	getDevices: async () => {
		set({ loading: true, error: null });
		try {
			const response = await get<TraccarDevice[]>({
				path: "DEVICES",
				config: { showAlert: false },
				auth: {
					Authorization: useAuthStore.getState().token || "",
				},
			});

			if (response && Array.isArray(response)) {
				set({
					devices: response,
					loading: false,
				});
			} else {
				throw new Error("No se recibió sesión válida");
			}
		} catch (error: any) {
			const apiError: ApiError = {
				message:
					error.response?.data?.message || "Failed to fetch devices",
				statusCode: error.response?.status,
				data: error.response?.data,
			};
			set({
				error: apiError,
				loading: false,
			});
			throw apiError;
		}
	},

	selectDevice: async (device: TraccarDevice | null) => {
		set({ selectedDevice: device });
	},

	getLastKnownLocation: async (positionId: number) => {
		set({ loading: true, error: null, devicePositions: [] });

		try {
			const response = await get<TraccarPosition[]>({
				path: "POSITIONS",
				pathComplement: `?id=${positionId}`,
				config: { showAlert: false },
				auth: {
					Authorization: useAuthStore.getState().token || "",
				},
			});

			if (response && Array.isArray(response)) {
				set({
					devicePositions: response,
					loading: false,
				});
			} else {
				throw new Error("No se recibió posición válida");
			}
		} catch (error: any) {
			const apiError: ApiError = {
				message:
					error.response?.data?.message ||
					"Failed to fetch positions",
				statusCode: error.response?.status,
				data: error.response?.data,
			};
			set({
				error: apiError,
				loading: false,
			});
			throw apiError;
		}
	},

	updateDevice: (updatedDevice: TraccarDevice) => {
		set((state) => ({
			devices: state.devices.map((device) =>
				device.id === updatedDevice.id ? updatedDevice : device
			),
		}));
	},
	/*

	getClimateLocation: async (
		lat: number,
		lon: number,
		exclude = "minutely"
	) => {}, */
}));

export default useDevicesStore;
