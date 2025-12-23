import { TraccarPosition } from "@/types/api";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
	Circle,
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";

const LocationMarker = () => {
	return (
		<View style={styles.markerContainer}>
			<View style={styles.locationPin}>
				<View style={styles.pinInner} />
			</View>
		</View>
	);
};

const Maps: React.FC<{ devicesPositions: TraccarPosition[] }> = ({
	devicesPositions,
}) => {
	console.log("Devices Positions in Map:", devicesPositions);
	const mapRef = useRef<MapView>(null);

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
			mapRef.current.setCamera({
				center: { latitude: avgLat, longitude: avgLng },
				zoom: 18,
				animation: {
					duration: 300,
					easing: "easeInOut",
				},
			});
		}
	}, [devicesPositions]);

	return (
		<MapView
			ref={mapRef}
			provider={PROVIDER_GOOGLE}
			initialRegion={{
				latitude: 41.3995345,
				longitude: 2.1909796,
				latitudeDelta: 0.003,
				longitudeDelta: 0.003,
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
						radius={100}
						fillColor="rgba(74, 144, 226, 0.2)"
						strokeColor="rgba(74, 144, 226, 0.5)"
						strokeWidth={2}
					/>

					<Marker
						coordinate={{
							latitude: position.latitude,
							longitude: position.longitude,
						}}
						anchor={{ x: 0.5, y: 0.5 }}
					>
						<LocationMarker />
					</Marker>
				</View>
			))}
		</MapView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	markerContainer: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	locationPin: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "#4A90E2",
		borderWidth: 4,
		borderColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	pinInner: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "white",
	},
});

export default Maps;
