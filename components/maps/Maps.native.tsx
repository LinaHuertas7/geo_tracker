import { TraccarPosition } from "@/types/api";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, {
	Circle,
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";

import { createMapStyles } from "@/components/maps/maps.native.styles";
import NavigationMarker from "@/components/maps/NavigationMarker";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

const Maps: React.FC<{ devicesPositions: TraccarPosition[] }> = ({
	devicesPositions,
}) => {
	const mapRef = useRef<MapView>(null);
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const styles = createMapStyles(colorScheme ?? "light");

	useEffect(() => {
		if (devicesPositions.length > 0 && mapRef.current) {
			const coordinates: LatLng[] = devicesPositions.map((pos) => ({
				latitude: pos.latitude,
				longitude: pos.longitude,
			}));
			const avgLat =
				coordinates.reduce((sum, c) => sum + c.latitude, 0) /
				coordinates.length;
			const avgLng =
				coordinates.reduce((sum, c) => sum + c.longitude, 0) /
				coordinates.length;
			mapRef.current.animateCamera(
				{
					center: { latitude: avgLat, longitude: avgLng },
					zoom: 18,
				},
				{ duration: 300 }
			);
		}
	}, [devicesPositions]);

	return (
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
			{devicesPositions.map((position, index) => (
				<View key={index}>
					<Circle
						center={{
							latitude: position.latitude,
							longitude: position.longitude,
						}}
						radius={90}
						fillColor={colors.fillColor}
						strokeColor={colors.strokeColor}
						strokeWidth={1}
					/>
					<Marker
						coordinate={{
							latitude: position.latitude,
							longitude: position.longitude,
						}}
						anchor={{ x: 0.4, y: 0.4 }}
					>
						<NavigationMarker
							colorScheme={colorScheme ?? "light"}
						/>
					</Marker>
				</View>
			))}
		</MapView>
	);
};

export default Maps;
