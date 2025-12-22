import { post } from "@/services/httpServiceAxios";
import { ApiError, TraccarUser } from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
	user: TraccarUser | null;
	token: string | null;
	loading: boolean;
	error: ApiError | null;
	isHydrated: boolean;
	isAuthenticated: boolean;
	sessionToken: string | null;

	login: (formData: FormData) => Promise<void>;
	logout: () => void;
	clearError: () => void;
	setHydrated: (hydrated: boolean) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			loading: false,
			error: null,
			isHydrated: false,
			isAuthenticated: false,
			sessionToken: null,

			login: async (formData: FormData) => {
				set({ loading: true, error: null });
				try {
					const response = await post<AxiosResponse>({
						path: "SESSION",
						data: formData,
						config: { showAlert: false },
					});

					if (response && response.data.id != null) {
						set({
							user: response.data.user,
							token:
								"Basic " +
								btoa(
									`${formData.get("email")}:${formData.get(
										"password"
									)}`
								),
							isAuthenticated: true,
							loading: false,
						});

						const expirationDate = new Date();
						expirationDate.setDate(expirationDate.getDate() + 1);
						const expirationISO = expirationDate.toISOString();
						console.log(
							"Requesting session token with expiration:",
							expirationISO
						);

						try {
							const sessionTokenResponse = await post<string>({
								path: "SESSION_TOKEN",
								data: {
									expiration: expirationISO,
								},
								config: { showAlert: false },
								auth: {
									Authorization: get().token || "",
								},
							});

							console.log(
								"Session token response:",
								sessionTokenResponse
							);

							if (sessionTokenResponse) {
								set({
									sessionToken: sessionTokenResponse,
								});
							}
						} catch (tokenError: any) {
							console.error(
								"Error requesting session token:",
								tokenError
							);
						}
					} else {
						throw new Error("No se recibió sesión válida");
					}
				} catch (error: any) {
					const apiError: ApiError = {
						message:
							error.response?.data?.message || "Login failed",
						statusCode: error.response?.status,
						data: error.response?.data,
					};
					set({
						error: apiError,
						loading: false,
						isAuthenticated: false,
					});
					throw apiError;
				}
			},

			logout: () => {
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					error: null,
				});
				// Limpiar cookie
				document.cookie =
					"JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			},

			clearError: () => set({ error: null }),

			setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.isHydrated = true;
				}
			},
		}
	)
);

export default useAuthStore;
