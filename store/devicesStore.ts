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
	allPositions: TraccarPosition[] | [];

	getDevices: () => Promise<void>;
	getAllPositionsByDevice: (deviceId: number) => Promise<void>;
	selectDevice: (device: TraccarDevice | null) => Promise<void>;
	updateDevice: (updatedDevice: TraccarDevice) => void;
	updatePositions: (updatedPosition: TraccarPosition) => void;
}

const useDevicesStore = create<AuthState>()((set) => ({
	devices: [],
	selectedDevice: null,
	loading: false,
	error: null,
	devicePositions: [],
	allPositions: [],

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

	getAllPositionsByDevice: async (deviceId: number) => {
		set({ loading: true, error: null });
		try {
			const response = await get<TraccarPosition[]>({
				path: "POSITIONS",
				pathComplement: `?deviceId=${deviceId}&from=2024-11-22T18:30:00Z&to=2026-12-22T18:30:00Z`,
				config: { showAlert: false },
				auth: {
					Authorization: useAuthStore.getState().token || "",
				},
			});

			if (response && Array.isArray(response)) {
				set({
					allPositions: response,
					loading: false,
				});
			} else {
				throw new Error("No se recibió sesión válida");
			}
		} catch (error: any) {
			const apiError: ApiError = {
				message:
					error.response?.data?.message ||
					"Failed to fetch device positions",
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

	updateDevice: (updatedDevice: TraccarDevice) => {
		set((state) => ({
			devices: state.devices.map((device) =>
				device.id === updatedDevice.id ? updatedDevice : device
			),
		}));
	},

	updatePositions: (updatedPosition: TraccarPosition) => {
		set((state) => {
			const currentPositions = state.devicePositions ?? [];
			const updatedList = currentPositions.map((position) =>
				position.id === updatedPosition.id ? updatedPosition : position
			);

			if (
				!currentPositions.find((pos) => pos.id === updatedPosition.id)
			) {
				console.log("Adding new position:", updatedPosition);
				updatedList.push(updatedPosition);
			}

			return {
				devicePositions: updatedList,
			};
		});
	},
}));

export default useDevicesStore;
