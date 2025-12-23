import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createMapStyles = (colorScheme: "light" | "dark" = "light") => {
	const colors = Colors[colorScheme ?? "light"];

	return StyleSheet.create({
		container: {
			flex: 1,
		},
		map: {
			width: "100%",
			height: "100%",
		},
		markerContainer: {
			width: 50,
			height: 50,
			justifyContent: "center",
			alignItems: "center",
		},
		outerCircle: {
			width: 50,
			height: 50,
			borderRadius: 30,
			backgroundColor: colors.outerCircle,
			justifyContent: "center",
			alignItems: "center",
		},
		innerCircle: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: colors.innerCircle,
			justifyContent: "center",
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		},
		triangle: {
			marginTop: -2,
		},
	});
};
export default createMapStyles;
