import { get } from "@/services/httpServiceAxios";
import { ApiError, TraccarDevice } from "@/types/api";
import { create } from "zustand";
import useAuthStore from "./authStore";

interface AuthState {
	devices: TraccarDevice[] | [];
	loading: boolean;
	error: ApiError | null;

	getDevices: () => Promise<void>;
}

const useDevicesStore = create<AuthState>()((set) => ({
	devices: [],
	loading: false,
	error: null,

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
}));

export default useDevicesStore;
