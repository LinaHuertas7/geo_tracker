import { TraccarPosition } from "@/types/api";
import React, { useEffect, useRef } from "react";
import { Image, View } from "react-native";
import MapView, {
	Circle,
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";

import { createMapStyles } from "@/components/maps/maps.native.styles";
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
				<React.Fragment key={index}>
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
						key={`marker-${index}`}
						coordinate={{
							latitude: position.latitude,
							longitude: position.longitude,
						}}
						anchor={{ x: 0.5, y: 0.5 }}
						tracksViewChanges={true}
						zIndex={999}
					>
						<View style={styles.markerContainer}>
							<Image
								source={require("@/assets/images/navigation_marker.png")}
								style={{ width: 40, height: 40 }}
								resizeMode="contain"
							/>
						</View>
					</Marker>
				</React.Fragment>
			))}
		</MapView>
	);
};

export default Maps;
