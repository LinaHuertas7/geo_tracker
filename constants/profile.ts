import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

export interface ProfileItem {
	key: string;
	iconName: IconName;
	label: string;
}

export const profileItems: ProfileItem[] = [
	{
		key: "profile",
		iconName: "person-outline",
		label: "Mi perfil",
	},
	{
		key: "settings",
		iconName: "settings-outline",
		label: "Configuraciones",
	},
	{
		key: "terms",
		iconName: "document-text-outline",
		label: "Términos y condiciones",
	},
];
