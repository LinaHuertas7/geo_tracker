import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createDevicesScreenStyles = (colorScheme: "light" | "dark") => {
	const colors = Colors[colorScheme];

	return StyleSheet.create({
		loadingContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		headerSection: {
			backgroundColor: colors.primary,
			paddingHorizontal: 20,
			paddingTop: 60,
			paddingBottom: 40,
		},
		headerTop: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 8,
		},
		headerTitle: {
			fontSize: 28,
			fontWeight: "700",
			color: "#FFFFFF",
			letterSpacing: -0.5,
		},
		notificationButton: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: "rgba(255, 255, 255, 0.15)",
			alignItems: "center",
			justifyContent: "center",
		},
		headerSubtitle: {
			fontSize: 14,
			color: "rgba(255, 255, 255, 0.8)",
			marginTop: 4,
		},
		contentContainer: {
			flex: 1,
			marginTop: -20,
		},
		listContainer: {
			backgroundColor: colorScheme === "dark" ? "#0F0F14" : "#F3F5F7",
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			paddingTop: 24,
			minHeight: "100%",
		},
		devicesContent: {
			paddingHorizontal: 20,
			paddingBottom: 100,
		},
		emptyState: {
			alignItems: "center",
			justifyContent: "center",
			paddingVertical: 60,
		},
		emptyIcon: {
			fontSize: 64,
			marginBottom: 16,
			opacity: 0.3,
		},
		emptyText: {
			fontSize: 16,
			color: colors.textSecondary,
			textAlign: "center",
			lineHeight: 24,
		},
	});
};
