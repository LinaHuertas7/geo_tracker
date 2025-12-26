import { get as getAxios } from "@/services/httpServiceAxios";
import { WeatherResponse } from "@/types/weather";
import { create } from "zustand";

const OPEN_WEATHER_API_KEY: string | undefined =
	process.env.OPEN_WEATHER_API_KEY;

interface WeatherState {
	weatherData: WeatherResponse | null;
	loading: boolean;
	error: any;

	getWeatherData: (lat: number, lon: number) => Promise<void>;
}

const useWeatherStore = create<WeatherState>((set) => ({
	weatherData: null,
	loading: false,
	error: null,

	getWeatherData: async (lat: number, lon: number) => {
		set({ loading: true, error: null, weatherData: null });
		try {
			const apiKey = OPEN_WEATHER_API_KEY;
			console.log("Using OpenWeather ------ API Key:", apiKey);
			const response = await getAxios<WeatherResponse>({
				path: "WEATHER",
				pathComplement: `?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`,
				config: { showAlert: false },
			});

			console.log("Weather API response:", response);

			if (response) {
				set({
					weatherData: response,
					loading: false,
				});
				console.log("first", response);
			} else {
				throw new Error("No valid weather data received");
			}
		} catch (error: any) {
			const apiError = {
				message:
					error.response?.data?.message ||
					"Failed to fetch weather data",
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
export default useWeatherStore;
