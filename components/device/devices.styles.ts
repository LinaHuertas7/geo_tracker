import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createDevicesStyles = (
	colorScheme: "light" | "dark",
	deviceStatus: "online" | "offline" | "unknown"
) => {
	const colors = Colors[colorScheme];
	const statusConfig: Record<
		string,
		{ color: string; label: string; bgColor: string }
	> = {
		online: { color: "#4CD964", label: "Online", bgColor: "#4CD96420" },
		offline: { color: "#ce8e8eff", label: "Offline", bgColor: "#ce8e8eff" },
		unknown: { color: "#8E8E93", label: "Unknown", bgColor: "#8E8E9320" },
	};

	const config = statusConfig[deviceStatus];
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		headerSection: {
			backgroundColor: colors.primary,
			paddingHorizontal: 20,
			paddingTop: 30,
			paddingBottom: 50,
		},
		headerTitle: {
			fontSize: 22,
			fontWeight: "700",
			color: colors.text,
			letterSpacing: -0.5,
		},
		headerSubtitle: {
			fontSize: 14,
			color: colors.textSecondary,
			marginTop: 8,
			lineHeight: 20,
		},
		contentContainer: {
			flex: 1,
			marginTop: -20,
		},
		listContainer: {
			backgroundColor: colorScheme === "dark" ? "#1A1A24" : "#FFFFFF",
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			paddingTop: 24,
			paddingHorizontal: 20,
			minHeight: "100%",
			shadowColor: "#000000",
			shadowOffset: { width: 0, height: -2 },
			shadowOpacity: 0.08,
			shadowRadius: 12,
			elevation: 10,
		},
		sectionHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 20,
		},
		sectionTitle: {
			fontSize: 13,
			fontWeight: "700",
			color: colors.text,
			letterSpacing: 0.5,
			textTransform: "uppercase",
		},
		sectionCount: {
			fontSize: 13,
			color: colors.textSecondary,
			fontWeight: "600",
		},
		seeAllButton: {
			fontSize: 13,
			color: colors.primary,
			fontWeight: "600",
		},
		deviceCard: {
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 16,
			borderBottomWidth: 1,
			borderBottomColor: colorScheme === "dark" ? "#2A2A35" : "#F0F2F5",
		},
		deviceLeft: {
			flexDirection: "row",
			alignItems: "center",
			flex: 1,
		},
		timeContainer: {
			minWidth: 60,
			marginRight: 16,
		},
		timeText: {
			fontSize: 14,
			fontWeight: "600",
			color: colors.text,
			lineHeight: 18,
		},
		amPmText: {
			fontSize: 12,
			color: colors.textSecondary,
			fontWeight: "500",
		},
		deviceInfo: {
			flex: 1,
		},
		deviceDetails: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
		},
		locationIcon: {
			fontSize: 11,
			color: colors.textSecondary,
		},
		deviceLocation: {
			fontSize: 13,
			color: colors.textSecondary,
			fontWeight: "400",
		},
		statusIndicator: {
			width: 8,
			height: 8,
			borderRadius: 4,
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
			fontSize: 15,
			color: colors.textSecondary,
			textAlign: "center",
		},

		card: {
			backgroundColor: colorScheme === "dark" ? "#1C1C24" : "#FFFFFF",
			borderRadius: 16,
			padding: 16,
			marginBottom: 12,
		},
		header: {
			flexDirection: "row",
			alignItems: "center",
			marginBottom: 12,
		},
		avatarContainer: {
			width: 48,
			height: 48,
			borderRadius: 24,
			backgroundColor: config.bgColor,
			alignItems: "center",
			justifyContent: "center",
			marginRight: 12,
		},
		avatarText: {
			fontSize: 18,
			fontWeight: "700",
			color: config.color,
		},
		deviceMainInfo: {
			flex: 1,
		},
		deviceName: {
			fontSize: 15,
			fontWeight: "700",
			color: colors.text,
			marginBottom: 4,
			letterSpacing: -0.3,
		},
		deviceId: {
			fontSize: 12,
			color: colors.textSecondary,
			fontWeight: "500",
		},
		statusBadge: {
			paddingHorizontal: 12,
			paddingVertical: 6,
			borderRadius: 8,
			backgroundColor: config.bgColor,
		},
		statusText: {
			fontSize: 12,
			fontWeight: "500",
			color: config.color,
			textTransform: "capitalize",
		},
		divider: {
			height: 1,
			backgroundColor: colorScheme === "dark" ? "#2A2A35" : "#F0F0F0",
			marginVertical: 12,
		},
		infoGrid: {
			gap: 8,
		},
		infoRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 6,
		},
		infoLabel: {
			fontSize: 13,
			color: colors.textSecondary,
			fontWeight: "500",
		},
		infoValue: {
			fontSize: 13,
			color: colors.textSecondary,
		},
	});
};
