import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createLoadingStyles = (colorScheme: "light" | "dark") => {
	const colors = Colors[colorScheme];
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		loadingText: {
			marginTop: 16,
			fontSize: 16,
			fontWeight: "600",
			color: colors.text,
			letterSpacing: 0.5,
		},
	});
};
