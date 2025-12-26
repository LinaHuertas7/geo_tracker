import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createAuthStyles = (colorScheme: "light" | "dark") => {
	const colors = Colors[colorScheme];

	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},

		errorText: {
			fontSize: 12,
			color: "#F44336",
			marginTop: 0,
			marginBottom: 24,
			textAlign: "center",
			fontWeight: "500",
		},

		scrollContent: {
			justifyContent: "center",
			paddingHorizontal: 20,
			paddingVertical: 40,
			minHeight: "100%",
		},

		passwordContainer: {
			position: "relative",
		},

		forgotPasswordContainer: {
			alignItems: "flex-end",
			marginTop: -36,
			marginBottom: 16,
			paddingHorizontal: 4,
			zIndex: 10,
		},

		forgotPasswordText: {
			textAlign: "right",
			fontSize: 12,
			cursor: "pointer",
			color: colors.primary,
			fontWeight: "600",
		},

		divider: {
			flexDirection: "row",
			alignItems: "center",
			marginVertical: 28,
			gap: 12,
		},

		buttonContainer: {
			marginTop: 24,
		},

		dividerLine: {
			flex: 1,
			height: 1,
			backgroundColor: colors.border,
		},

		dividerText: {
			fontSize: 12,
			color: colors.textSecondary,
		},

		footer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 20,
			gap: 4,
		},

		footerText: {
			fontSize: 13,
			color: colors.textSecondary,
		},

		footerLink: {
			fontSize: 13,
			color: colors.primary,
			fontWeight: "600",
		},
	});
};
