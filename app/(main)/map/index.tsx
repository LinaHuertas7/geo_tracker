import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 41.3995345,
					longitude: 2.1909796,
					latitudeDelta: 0.003,
					longitudeDelta: 0.003,
				}}
				mapType="standard"
			></MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
