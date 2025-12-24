import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createMapStyles = (colorScheme: "light" | "dark") => {
	const colors = Colors[colorScheme];

	return StyleSheet.create({
		map: {
			width: "100%",
			height: "100%",
		},
		markerContainer: {
			alignItems: "center",
			justifyContent: "center",
		},
		outerCircle: {
			width: 48,
			height: 48,
			borderRadius: 24,
			backgroundColor: colors.outerCircle,
			borderWidth: 2,
			borderColor: colors.outerCircle,
			alignItems: "center",
			justifyContent: "center",
		},
		innerCircle: {
			width: 32,
			height: 32,
			borderRadius: 16,
			backgroundColor: colors.innerCircle,
			alignItems: "center",
			justifyContent: "center",
		},
		triangle: {
			transform: [{ rotate: "0deg" }],
		},
	});
};
