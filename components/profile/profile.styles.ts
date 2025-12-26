import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createProfileStyles = (colorScheme: "light" | "dark") => {
	const colors = Colors[colorScheme];

	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		header: {
			height: 180,
			backgroundColor: colors.primary,
			borderBottomLeftRadius: 30,
			borderBottomRightRadius: 30,
			paddingTop: 50,
			paddingHorizontal: 20,
		},
		headerTop: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		editText: {
			color: "white",
			fontSize: 16,
			fontWeight: "500",
		},
		content: {
			flex: 1,
			alignItems: "center",
			marginTop: -80,
			paddingHorizontal: 20,
		},
		avatarContainer: {
			position: "relative",
			marginBottom: 16,
		},
		avatarCircle: {
			width: 120,
			height: 120,
			borderRadius: 60,
			backgroundColor: colors.primary,
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 5,
			borderColor: "white",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.15,
			shadowRadius: 8,
			elevation: 8,
		},
		avatarText: {
			fontSize: 48,
			fontWeight: "bold",
			color: "white",
		},
		checkBadge: {
			position: "absolute",
			bottom: 5,
			right: 5,
			width: 32,
			height: 32,
			borderRadius: 16,
			backgroundColor: colors.primary,
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 3,
			borderColor: "white",
		},
		name: {
			fontSize: 24,
			fontWeight: "bold",
			color: "#333",
			marginBottom: 4,
		},
		email: {
			fontSize: 14,
			color: "#999",
			marginBottom: 32,
		},
		menuContainer: {
			width: "100%",
			backgroundColor: colors.surface,
			borderRadius: 16,
			padding: 8,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.08,
			shadowRadius: 8,
			elevation: 3,
		},
		menuItem: {
			flexDirection: "row",
			alignItems: "center",
			padding: 16,
			borderRadius: 12,
		},
		menuIconContainer: {
			width: 40,
			height: 40,
			borderRadius: 10,
			backgroundColor: colors.primary,
			justifyContent: "center",
			alignItems: "center",
			marginRight: 12,
		},
		menuText: {
			flex: 1,
			fontSize: 15,
			color: colors.textSecondary,
			fontWeight: "500",
		},
		badge: {
			backgroundColor: colors.primary,
			borderRadius: 10,
			paddingHorizontal: 8,
			paddingVertical: 2,
			marginRight: 8,
		},
		badgeText: {
			color: "white",
			fontSize: 12,
			fontWeight: "bold",
		},
		logoutButton: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 24,
			padding: 16,
			gap: 8,
		},
		logoutText: {
			fontSize: 16,
			color: colors.text,
			fontWeight: "500",
		},
	});
};
