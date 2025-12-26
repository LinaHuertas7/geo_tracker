import { TraccarPosition } from "@/types/api";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import MapView, {
	Circle,
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";

import { createMapStyles } from "@/components/maps/maps.native.styles";
import { Colors } from "@/constants/theme";
import { WEATHER_TRANSLATIONS } from "@/constants/weather";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import useWeatherStore from "@/store/weatherStore";
import { centerCoordinatesHelper, responderHelper } from "@/utils/mapView";
import { Text } from "@react-navigation/elements";
import {
	Animated,
	Dimensions,
	Image,
	Modal,
	TouchableOpacity,
	View,
} from "react-native";
import Loading from "../loading/Loadig";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface MapsProps {
	filteredPositionsBySelectedDevice: TraccarPosition[];
}

const Maps: React.FC<MapsProps> = ({ filteredPositionsBySelectedDevice }) => {
	const mapRef = useRef<MapView>(null);
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const styles = createMapStyles(colorScheme ?? "light");

	const getWeatherData = useWeatherStore((state) => state.getWeatherData);
	const weatherData = useWeatherStore((state) => state.weatherData);

	const lastPosition = useMemo(() => {
		if (!filteredPositionsBySelectedDevice?.length) return null;
		return filteredPositionsBySelectedDevice[
			filteredPositionsBySelectedDevice.length - 1
		];
	}, [filteredPositionsBySelectedDevice]);

	const centerCoordinates: LatLng | null = useMemo(() => {
		if (!filteredPositionsBySelectedDevice?.length) return null;
		return centerCoordinatesHelper(filteredPositionsBySelectedDevice);
	}, [filteredPositionsBySelectedDevice]);

	useEffect(() => {
		if (centerCoordinates && mapRef.current) {
			mapRef.current.animateCamera(
				{
					center: centerCoordinates,
					zoom: 18,
				},
				{ duration: 300 }
			);
		}
	}, [centerCoordinates]);

	const [showWeatherOverlay, setShowWeatherOverlay] = useState(false);
	const translateY = useRef(new Animated.Value(0)).current;
	const backdropOpacity = useRef(new Animated.Value(0)).current;

	const handleOnPressMarker = () => {
		if (lastPosition) {
			getWeatherData(lastPosition.latitude, lastPosition.longitude);
		}
		setShowWeatherOverlay(true);
		Animated.timing(backdropOpacity, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const handleCloseOverlay = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: SCREEN_HEIGHT,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(backdropOpacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start(() => {
			setShowWeatherOverlay(false);
			translateY.setValue(0);
			backdropOpacity.setValue(0);
		});
	}, [translateY, backdropOpacity]);

	const panResponder = useRef<any>(
		responderHelper(translateY, handleCloseOverlay)
	);

	return !lastPosition ? (
		<Loading />
	) : (
		<>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 4.711,
					longitude: -74.0721,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				}}
				mapType="standard"
				style={styles.map}
			>
				<Circle
					key={`circle-${lastPosition?.id}`}
					center={{
						latitude: lastPosition?.latitude,
						longitude: lastPosition?.longitude,
					}}
					radius={90}
					fillColor={colors.fillColor}
					strokeColor={colors.strokeColor}
					strokeWidth={1}
				/>
				<Marker
					key={`marker-${lastPosition?.id}`}
					coordinate={{
						latitude: lastPosition?.latitude,
						longitude: lastPosition?.longitude,
					}}
					anchor={{ x: 0.5, y: 0.5 }}
					tracksViewChanges={true}
					zIndex={999}
					onPress={() => handleOnPressMarker()}
				>
					<View style={styles.markerContainer}>
						<Image
							source={require("@/assets/images/navigation_marker.png")}
							style={{ width: 40, height: 40 }}
							resizeMode="contain"
						/>
					</View>
				</Marker>
			</MapView>

			<Modal
				visible={showWeatherOverlay}
				transparent={true}
				animationType="none"
				onRequestClose={handleCloseOverlay}
			>
				<Animated.View
					style={[styles.backdrop, { opacity: backdropOpacity }]}
				>
					<TouchableOpacity
						activeOpacity={1}
						onPress={handleCloseOverlay}
						style={{ flex: 1, justifyContent: "flex-end" }}
					>
						<Animated.View
							style={[
								styles.containerModal,
								{
									transform: [{ translateY }],
								},
							]}
							{...(panResponder.current?.panHandlers ?? {})}
						>
							<View style={styles.header}>
								<View style={styles.dragIndicator} />
								<View style={styles.titleRow}>
									<View style={{ flex: 1 }}>
										<Text style={styles.title}>
											Información del Clima
										</Text>
										<Text style={styles.subtitle}>
											{weatherData?.weather?.[0]
												?.description
												? WEATHER_TRANSLATIONS[
														weatherData.weather[0]
															.description
												  ]
												: "Cargando..."}
										</Text>
									</View>
									<TouchableOpacity
										onPress={handleCloseOverlay}
									>
										<Text style={styles.closeButton}>
											✕
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View style={styles.content}>
								<View style={styles.quickStatsContainer}>
									<View
										style={[
											styles.quickStatCard,
											styles.quickStatCardPrimary,
										]}
									>
										<Text
											style={[
												styles.quickStatLabel,
												styles.quickStatLabelPrimary,
											]}
										>
											Temp
										</Text>
										<Text
											style={[
												styles.quickStatValue,
												styles.quickStatValuePrimary,
											]}
										>
											{weatherData?.main.temp
												? weatherData.main.temp.toFixed(
														0
												  )
												: "--"}
										</Text>
										<Text
											style={[
												styles.quickStatUnit,
												styles.quickStatValuePrimary,
											]}
										>
											°C
										</Text>
									</View>

									<View style={styles.quickStatCard}>
										<Text style={styles.quickStatLabel}>
											Viento
										</Text>
										<Text style={styles.quickStatValue}>
											{weatherData?.wind.speed
												? weatherData.wind.speed.toFixed(
														1
												  )
												: "--"}
										</Text>
										<Text style={styles.quickStatUnit}>
											m/s
										</Text>
									</View>

									<View style={styles.quickStatCard}>
										<Text style={styles.quickStatLabel}>
											Nubes
										</Text>
										<Text style={styles.quickStatValue}>
											{weatherData?.clouds.all !==
											undefined
												? weatherData.clouds.all
												: "--"}
										</Text>
										<Text style={styles.quickStatUnit}>
											%
										</Text>
									</View>
								</View>

								<Text style={styles.sectionTitle}>
									Detalles
								</Text>
								<View style={styles.detailsCard}>
									<View style={styles.dataRow}>
										<Text style={styles.label}>
											Sensación Térmica
										</Text>
										<Text style={styles.value}>
											{weatherData?.main.feels_like
												? `${weatherData.main.feels_like.toFixed(
														1
												  )}°C`
												: "N/A"}
										</Text>
									</View>

									<View style={styles.dataRow}>
										<Text style={styles.label}>
											Humedad
										</Text>
										<Text style={styles.value}>
											{weatherData?.main.humidity
												? `${weatherData.main.humidity}%`
												: "N/A"}
										</Text>
									</View>

									<View style={styles.dataRow}>
										<Text style={styles.label}>
											Presión
										</Text>
										<Text style={styles.value}>
											{weatherData?.main.pressure
												? `${weatherData.main.pressure} hPa`
												: "N/A"}
										</Text>
									</View>

									<View
										style={[
											styles.dataRow,
											styles.lastDataRow,
										]}
									>
										<Text style={styles.label}>
											Visibilidad
										</Text>
										<Text style={styles.value}>
											{weatherData?.visibility
												? `${(
														weatherData.visibility /
														1000
												  ).toFixed(1)} km`
												: "N/A"}
										</Text>
									</View>
								</View>
							</View>
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
			</Modal>
		</>
	);
};

export default Maps;
