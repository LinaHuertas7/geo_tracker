import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Slot, Stack, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
	anchor: "(devices)",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const rootNavigationState = useRootNavigationState();

	if (!rootNavigationState?.key) return <Slot />;

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<Stack>
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(main)" options={{ headerShown: false }} />
				<Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
