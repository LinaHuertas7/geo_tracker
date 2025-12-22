import { createTabBarStyle } from "@/components/tabBar/tabBar.styles";
import { TabBarItem } from "@/components/tabBar/TabBarItem";
import { TAB_CONFIGS } from "@/constants/tabs";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainLayout() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const insets = useSafeAreaInsets();

	const tabBarHeight = Platform.OS === "ios" ? 80 + insets.bottom : 70;

	const style = createTabBarStyle(
		tabBarHeight,
		insets,
		colorScheme ?? "light"
	);

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.textSecondary,
				tabBarShowLabel: false,
				tabBarStyle: style.container,
				headerShown: false,
			}}
		>
			{TAB_CONFIGS.map((tab) => (
				<Tabs.Screen
					key={tab.name}
					name={`${tab.name}/index`}
					options={{
						tabBarIcon: ({ color, focused }) => (
							<TabBarItem
								focused={focused}
								color={color}
								iconName={
									focused ? tab.iconFocusedName : tab.iconName
								}
								iconType={tab.iconType}
								label={tab.label}
								iconSize={22}
								labelSize={12}
							/>
						),
					}}
				/>
			))}
			<Tabs.Screen
				name="scan"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
