import Map from "@/components/maps/Maps";
import useDevicesStore from "@/store/devicesStore";
import { StyleSheet, View } from "react-native";

export default function MapScreen() {
	const selectedDevice = useDevicesStore((state) => state.selectedDevice);

	const positionsWebsocket = useDevicesStore(
		(state) => state.devicePositions
	);

	const filteredPositionsBySelectedDevice = positionsWebsocket.filter(
		(position) => position.deviceId === selectedDevice?.id
	);

	return (
		<View style={styles.container}>
			<Map
				key={selectedDevice?.positionId ?? "no-pos"}
				filteredPositionsBySelectedDevice={
					filteredPositionsBySelectedDevice
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
