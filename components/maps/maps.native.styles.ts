import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createMapStyles = (colorScheme: "light" | "dark" = "light") => {
	const colors = Colors[colorScheme ?? "light"];

	return StyleSheet.create({
		container: {
			flex: 1,
		},
		markerImage: {
			width: 40,
			height: 40,
		},
		map: {
			width: "100%",
			height: "100%",
		},
		markerContainer: {
			width: 40,
			height: 40,
			justifyContent: "center",
			alignItems: "center",
			overflow: "visible",
			zIndex: 100,
		},
		innerCircle: {
			width: 30,
			height: 30,
			borderRadius: 30,
			backgroundColor: colors.innerCircle,
			justifyContent: "center",
			alignItems: "center",
			shadowColor: "#ffffffff",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
		},
		triangle: {
			marginTop: -2,
		},
		backdrop: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			justifyContent: "flex-end",
		},
		containerModal: {
			backgroundColor: colors.modalBackground,
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
			width: "100%",
			maxHeight: "80%",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: -4 },
			shadowOpacity: 0.2,
			shadowRadius: 16,
			elevation: 12,
		},
		header: {
			paddingHorizontal: 24,
			paddingTop: 20,
			paddingBottom: 20,
			backgroundColor: colorScheme === "dark" ? "#0000001f" : "#d1d1d114",
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
		},
		weatherIcon: {
			fontSize: 48,
			marginBottom: 8,
		},
		dragIndicator: {
			width: 45,
			height: 5,
			backgroundColor: colors.primary,
			borderRadius: 3,
			alignSelf: "center",
			marginBottom: 20,
		},
		titleRow: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-start",
		},
		title: {
			fontSize: 24,
			fontWeight: "800",
			color: colors.text,
			letterSpacing: -0.8,
			marginBottom: 6,
		},
		closeButton: {
			fontSize: 22,
			color: colors.textSecondary,
			fontWeight: "300",
			width: 36,
			height: 36,
			textAlign: "center",
			lineHeight: 36,
			marginLeft: 12,
			marginTop: -4,
		},
		subtitle: {
			fontSize: 15,
			color: colors.textSecondary,
			fontWeight: "600",
			marginTop: 2,
			textTransform: "capitalize",
		},
		content: {
			paddingHorizontal: 24,
			paddingTop: 8,
			paddingBottom: 24,
		},
		quickStatsContainer: {
			flexDirection: "row",
			gap: 10,
			marginBottom: 24,
		},
		quickStatCard: {
			flex: 1,
			backgroundColor: colors.placeholder + "18",
			borderRadius: 18,
			paddingVertical: 18,
			paddingHorizontal: 12,
			alignItems: "center",
		},
		quickStatCardPrimary: {
			backgroundColor: colors.primaryDark + "22",
			borderColor: colors.primaryDark + "44",
			color: colors.primary,
			borderWidth: 1,
		},
		quickStatLabel: {
			fontSize: 11,
			color: colors.textSecondary,
			fontWeight: "700",
			textTransform: "uppercase",
			letterSpacing: 1,
			marginBottom: 10,
		},
		quickStatLabelPrimary: {
			color: colors.primary,
		},
		quickStatValue: {
			fontSize: 28,
			color: colors.text,
			fontWeight: "800",
			letterSpacing: -1,
		},
		quickStatValuePrimary: {
			color: colors.primary,
		},
		quickStatUnit: {
			fontSize: 13,
			color: colors.textSecondary,
			fontWeight: "700",
			marginTop: 4,
		},
		sectionTitle: {
			fontSize: 17,
			fontWeight: "800",
			color: colors.text,
			marginBottom: 14,
			letterSpacing: 0.2,
		},
		detailsCard: {
			backgroundColor:
				colorScheme === "dark"
					? "rgba(255, 255, 255, 0.05)"
					: "rgba(0, 0, 0, 0.03)",
			borderRadius: 18,
			paddingVertical: 8,
			paddingHorizontal: 18,
			borderWidth: 1,
			borderColor:
				colorScheme === "dark"
					? "rgba(255, 255, 255, 0.08)"
					: "rgba(0, 0, 0, 0.06)",
		},
		dataRow: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingVertical: 16,
			borderBottomWidth: 1,
			borderBottomColor:
				colorScheme === "dark"
					? "rgba(255, 255, 255, 0.08)"
					: "rgba(0, 0, 0, 0.08)",
		},
		lastDataRow: {
			borderBottomWidth: 0,
			paddingBottom: 12,
		},
		label: {
			fontSize: 15,
			color: colors.textSecondary,
			fontWeight: "600",
			letterSpacing: 0.2,
		},
		value: {
			fontSize: 16,
			color: colors.text,
			fontWeight: "800",
			letterSpacing: 0.1,
		},
		footer: {
			paddingHorizontal: 24,
			paddingVertical: 22,
			borderTopWidth: 1,
			borderTopColor:
				colorScheme === "dark"
					? "rgba(255, 255, 255, 0.1)"
					: "rgba(0, 0, 0, 0.1)",
			backgroundColor:
				colorScheme === "dark"
					? "rgba(255, 255, 255, 0.03)"
					: "rgba(0, 0, 0, 0.02)",
		},
		coordinates: {
			fontSize: 14,
			color: colors.textSecondary,
			textAlign: "center",
			fontWeight: "700",
			letterSpacing: 0.4,
		},
	});
};

export default createMapStyles;
