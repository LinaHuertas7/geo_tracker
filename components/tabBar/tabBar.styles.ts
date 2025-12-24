import { Colors } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const createTabBarStyles = () => {
	return StyleSheet.create({
		tabItemContainer: {
			alignItems: "center",
			justifyContent: "center",
			minWidth: 90,
		},
		icon: {
			marginTop: 4,
		},
	});
};

export const createTabBarStyle = (
	height: number,
	insets: any,
	colorScheme: "light" | "dark"
) => {
	const colors = Colors[colorScheme];

	return StyleSheet.create({
		container: {
			backgroundColor: colors.background,
			borderTopWidth: 0,
			height: height,
			paddingBottom: Platform.OS === "ios" ? insets.bottom : 10,
			paddingTop: 8,
			elevation: 0,
			shadowColor: "#000",
			shadowOpacity: 0.05,
			shadowRadius: 10,
			shadowOffset: { width: 0, height: -2 },
			position: "absolute",
			bottom: 0,
			left: 0,
			right: 0,
		},
	});
};

export const getIndicatorStyle = (focused: boolean, color: string) =>
	StyleSheet.create({
		indicator: {
			width: focused ? 50 : 40,
			height: 4,
			backgroundColor: focused ? color : "transparent",
			borderRadius: 2,
			position: "absolute",
			top: -8,
		},
	});

export const getLabelStyle = (
	color: string,
	focused: boolean,
	fontSize: number
) =>
	StyleSheet.create({
		label: {
			color: color,
			fontSize: fontSize,
			marginTop: 4,
			fontWeight: focused ? "600" : "400",
		},
	});
