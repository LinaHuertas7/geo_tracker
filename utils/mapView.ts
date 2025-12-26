import { TraccarPosition } from "@/types/api";
import { Animated, PanResponder } from "react-native";
import { LatLng } from "react-native-maps";

export const centerCoordinatesHelper = (
	filteredPositionsBySelectedDevice: TraccarPosition[]
) => {
	const coordinates: LatLng[] = filteredPositionsBySelectedDevice.map(
		(pos) => ({
			latitude: pos.latitude,
			longitude: pos.longitude,
		})
	);
	const avgLat =
		coordinates.reduce((sum, c) => sum + c.latitude, 0) /
		coordinates.length;
	const avgLng =
		coordinates.reduce((sum, c) => sum + c.longitude, 0) /
		coordinates.length;

	return { latitude: avgLat, longitude: avgLng };
};

export const responderHelper = (
	translateY: Animated.Value,
	handleCloseOverlay: () => void
) => {
	PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: (_, gestureState) => {
			return Math.abs(gestureState.dy) > 5;
		},
		onPanResponderMove: (_, gestureState) => {
			if (gestureState.dy > 0) {
				translateY.setValue(gestureState.dy);
			}
		},
		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dy > 100) {
				handleCloseOverlay();
			} else {
				Animated.spring(translateY, {
					toValue: 0,
					useNativeDriver: true,
					tension: 50,
					friction: 8,
				}).start();
			}
		},
	});
};
