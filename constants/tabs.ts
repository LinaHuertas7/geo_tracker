interface TabConfig {
	name: string;
	iconName: string;
	iconFocusedName: string;
	iconType: "ionicons" | "material";
	label: string;
}

const TAB_CONFIGS: TabConfig[] = [
	{
		name: "map",
		iconName: "map-marker-outline",
		iconFocusedName: "map-marker",
		iconType: "material",
		label: "Map",
	},
	{
		name: "devices",
		iconName: "devices",
		iconFocusedName: "devices",
		iconType: "material",
		label: "Devices",
	},
	{
		name: "settings",
		iconName: "settings-outline",
		iconFocusedName: "settings",
		iconType: "ionicons",
		label: "Settings",
	},
];

export { TAB_CONFIGS };
