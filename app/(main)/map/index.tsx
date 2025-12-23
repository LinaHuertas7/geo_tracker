import Map from "@/components/maps/Maps";
import useDevicesStore from "@/store/devicesStore";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function MapScreen() {
	const selectedDevice = useDevicesStore((state) => state.selectedDevice);

	const getLastKnownLocation = useDevicesStore(
		(state) => state.getLastKnownLocation
	);

	useEffect(() => {
		if (selectedDevice) {
			getLastKnownLocation(selectedDevice?.positionId || 0);
		}
	}, [getLastKnownLocation, selectedDevice]);

	const devicePositions = useDevicesStore((state) => state.devicePositions);

	return (
		<View style={styles.container}>
			<Map devicesPositions={devicePositions} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
