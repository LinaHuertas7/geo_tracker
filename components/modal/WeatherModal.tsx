import { createMapStyles } from "@/components/maps/maps.native.styles";
import { WEATHER_TRANSLATIONS } from "@/constants/weather";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import useWeatherStore from "@/store/weatherStore";
import { responderHelper } from "@/utils/mapView";
import { Text } from "@react-navigation/elements";
import React, { useCallback, useEffect, useRef } from "react";
import {
	Animated,
	Dimensions,
	Modal,
	TouchableOpacity,
	View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface WeatherModalProps {
	visible: boolean;
	onClose: () => void;
}

const WeatherModal: React.FC<WeatherModalProps> = ({ visible, onClose }) => {
	const colorScheme = useColorScheme();
	const styles = createMapStyles(colorScheme ?? "light");
	const weatherData = useWeatherStore((state) => state.weatherData);

	const translateY = useRef(new Animated.Value(0)).current;
	const backdropOpacity = useRef(new Animated.Value(0)).current;

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
			onClose();
			translateY.setValue(0);
			backdropOpacity.setValue(0);
		});
	}, [translateY, backdropOpacity, onClose]);

	const panResponder = useRef<any>(
		responderHelper(translateY, handleCloseOverlay)
	);

	useEffect(() => {
		if (visible) {
			Animated.timing(backdropOpacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [visible, backdropOpacity]);

	return (
		<Modal
			visible={visible}
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
										{weatherData?.weather?.[0]?.description
											? WEATHER_TRANSLATIONS[
													weatherData.weather[0]
														.description
											  ]
											: "Cargando..."}
									</Text>
								</View>
								<TouchableOpacity onPress={handleCloseOverlay}>
									<Text style={styles.closeButton}>✕</Text>
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
											? weatherData.main.temp.toFixed(0)
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
											? weatherData.wind.speed.toFixed(1)
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
										{weatherData?.clouds.all !== undefined
											? weatherData.clouds.all
											: "--"}
									</Text>
									<Text style={styles.quickStatUnit}>%</Text>
								</View>
							</View>

							<Text style={styles.sectionTitle}>Detalles</Text>
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
									<Text style={styles.label}>Humedad</Text>
									<Text style={styles.value}>
										{weatherData?.main.humidity
											? `${weatherData.main.humidity}%`
											: "N/A"}
									</Text>
								</View>

								<View style={styles.dataRow}>
									<Text style={styles.label}>Presión</Text>
									<Text style={styles.value}>
										{weatherData?.main.pressure
											? `${weatherData.main.pressure} hPa`
											: "N/A"}
									</Text>
								</View>

								<View
									style={[styles.dataRow, styles.lastDataRow]}
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
	);
};

export default WeatherModal;
