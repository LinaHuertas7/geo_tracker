import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import {
	createTabBarStyles,
	getIndicatorStyle,
	getLabelStyle,
} from "./tabBar.styles";

export interface TabBarItemProps {
	focused: boolean;
	color: string;
	iconName: string;
	iconType?: "ionicons" | "material";
	label: string;
	iconSize: number;
	labelSize: number;
}

export const TabBarItem: React.FC<TabBarItemProps> = ({
	focused,
	color,
	iconName,
	iconType = "ionicons",
	label,
	iconSize,
	labelSize,
}) => {
	const styles = createTabBarStyles();

	const indicatorStyles = getIndicatorStyle(focused, color);
	const labelStyles = getLabelStyle(color, focused, labelSize);

	const IconComponent =
		iconType === "material" ? MaterialCommunityIcons : Ionicons;

	return (
		<View style={styles.tabItemContainer}>
			<View style={indicatorStyles.indicator} />
			<IconComponent
				name={iconName as any}
				size={iconSize}
				color={color}
				style={styles.icon}
			/>
			<Text style={labelStyles.label}>{label}</Text>
		</View>
	);
};
