export interface OpenWeatherOneCall {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: OWCurrent;
	minutely?: OWMinutely[];
	hourly?: OWHourly[];
	daily?: OWDaily[];
	alerts?: OWAlert[];
}

export interface OWWeather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface OWCurrent {
	dt: number;
	sunrise?: number;
	sunset?: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi?: number;
	clouds: number;
	visibility?: number;
	wind_speed?: number;
	wind_deg?: number;
	wind_gust?: number;
	weather: OWWeather[];
	rain?: { "1h"?: number } | number;
	snow?: { "1h"?: number } | number;
}

export interface OWMinutely {
	dt: number;
	precipitation: number;
}

export interface OWHourly {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi?: number;
	clouds: number;
	visibility?: number;
	wind_speed?: number;
	wind_deg?: number;
	wind_gust?: number;
	weather: OWWeather[];
	pop?: number;
	rain?: { "1h"?: number } | number;
	snow?: { "1h"?: number } | number;
}

export interface OWDaily {
	dt: number;
	sunrise?: number;
	sunset?: number;
	moonrise?: number;
	moonset?: number;
	moon_phase?: number;
	summary?: string;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed?: number;
	wind_deg?: number;
	wind_gust?: number;
	weather: OWWeather[];
	clouds?: number;
	pop?: number;
	rain?: number;
	snow?: number;
	uvi?: number;
}

export interface OWAlert {
	sender_name?: string;
	event: string;
	start: number;
	end: number;
	description?: string;
	tags?: string[];
}

export interface WeatherResponse {
	coord: Coord;
	weather: Weather[];
	base: string;
	main: Main;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: Sys;
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface Coord {
	lon: number;
	lat: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level: number;
	grnd_level: number;
}

export interface Wind {
	speed: number;
	deg: number;
}

export interface Clouds {
	all: number;
}

export interface Sys {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}
