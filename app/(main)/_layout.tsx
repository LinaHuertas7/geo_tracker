import { createTabBarStyle } from "@/components/tabBar/tabBar.styles";
import { TabBarItem } from "@/components/tabBar/TabBarItem";
import { TAB_CONFIGS } from "@/constants/tabs";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import websocketservice from "@/services/websocketservice";
import useDevicesStore from "@/store/devicesStore";
import { TraccarDevice } from "@/types/api";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
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

	const updateDevice = useDevicesStore((state) => state.updateDevice);

	const appStateRef = useRef<AppStateStatus>(AppState.currentState);

	useEffect(() => {
		websocketservice.connect();

		const handleDevices = (devices: TraccarDevice[]) => {
			for (const device of devices) {
				updateDevice(device);
			}
		};

		const handlePositionsRealTime = (positions: any[]) => {
			const updatePositions = useDevicesStore.getState().updatePositions;
			for (const position of positions) {
				updatePositions(position);
			}
		};

		websocketservice.addCallbacks("devices", handleDevices);
		websocketservice.addCallbacks("positions", handlePositionsRealTime);

		const subscription = AppState.addEventListener(
			"change",
			(nextAppState: AppStateStatus) => {
				if (
					appStateRef.current.match(/inactive|background/) &&
					nextAppState === "active"
				) {
					console.log(
						"App came to foreground - reconnecting WebSocket"
					);
					websocketservice.connect();
				}

				if (nextAppState.match(/inactive|background/)) {
					console.log(
						"App going to background - keeping WebSocket open"
					);
				}

				appStateRef.current = nextAppState;
			}
		);

		return () => {
			websocketservice.removeCallbacks("devices", handleDevices);
			websocketservice.removeCallbacks(
				"positions",
				handlePositionsRealTime
			);
			websocketservice.disconnect();
			subscription.remove();
		};
	}, [updateDevice]);

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
