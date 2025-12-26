import { TraccarPosition } from "@/types/api";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, {
	Circle,
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";

import Loading from "@/components/loading/Loadig";
import { createMapStyles } from "@/components/maps/maps.native.styles";
import WeatherModal from "@/components/modal/WeatherModal";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import useWeatherStore from "@/store/weatherStore";
import { centerCoordinatesHelper } from "@/utils/mapView";
import { Image, View } from "react-native";

interface MapsProps {
	filteredPositionsBySelectedDevice: TraccarPosition[];
}

const Maps: React.FC<MapsProps> = ({ filteredPositionsBySelectedDevice }) => {
	const mapRef = useRef<MapView>(null);
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const styles = createMapStyles(colorScheme ?? "light");

	const getWeatherData = useWeatherStore((state) => state.getWeatherData);
	const [mapReady, setMapReady] = useState(false);
	const [showWeatherOverlay, setShowWeatherOverlay] = useState(false);

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
		if (centerCoordinates && mapRef.current && mapReady) {
			mapRef.current.animateToRegion(
				{
					latitude: centerCoordinates.latitude,
					longitude: centerCoordinates.longitude,
					latitudeDelta: 0.002,
					longitudeDelta: 0.002,
				},
				300
			);
		}
	}, [centerCoordinates, mapReady]);

	const handleOnPressMarker = () => {
		if (lastPosition) {
			getWeatherData(lastPosition.latitude, lastPosition.longitude);
			setShowWeatherOverlay(true);
		}
	};

	const handleCloseWeatherModal = () => {
		setShowWeatherOverlay(false);
	};

	return !lastPosition ? (
		<Loading />
	) : (
		<>
			<MapView
				onMapReady={() => setMapReady(true)}
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
					onPress={handleOnPressMarker}
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

			<WeatherModal
				visible={showWeatherOverlay}
				onClose={handleCloseWeatherModal}
			/>
		</>
	);
};

export default Maps;
