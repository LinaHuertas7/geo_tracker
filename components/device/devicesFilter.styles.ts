import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createDevicesFilterStyles = (colorScheme: "light" | "dark") => {
	const colors = Colors[colorScheme];

	return StyleSheet.create({
		filterContainer: {
			flexDirection: "row",
			gap: 12,
			paddingHorizontal: 20,
			marginBottom: 20,
		},
		filterButton: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			paddingVertical: 14,
			paddingHorizontal: 5,
			borderRadius: 12,
			backgroundColor: colorScheme === "dark" ? "#2A2A35" : "#F5F5F5",
			gap: 6,
		},
		filterButtonActive: {
			backgroundColor: colors.filterChipBackground,
		},
		filterText: {
			fontSize: 13,
			fontWeight: "600",
			color: colorScheme === "dark" ? "#FFFFFF" : "#1C1C1E",
		},
		filterTextActive: {
			color: "#FFFFFF",
		},
		filterCount: {
			fontSize: 12,
			fontWeight: "700",
			color: colorScheme === "dark" ? "#8E8E93" : "#6B7280",
		},
		filterCountActive: {
			color: "#FFFFFF",
			opacity: 0.8,
		},
	});
};
