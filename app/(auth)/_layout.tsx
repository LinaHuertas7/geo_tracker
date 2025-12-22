import useAuthStore from "@/store/authStore";
import { Slot, Stack, useRootNavigationState } from "expo-router";
import React from "react";

export default function AuthLayout() {
	const isHydrated = useAuthStore((s) => s.isHydrated);
	const rootNavigationState = useRootNavigationState();

	if (!isHydrated || !rootNavigationState?.key) return <Slot />;

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
