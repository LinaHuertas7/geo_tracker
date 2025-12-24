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
		label: "Mapa",
	},
	{
		name: "devices",
		iconName: "devices",
		iconFocusedName: "devices",
		iconType: "material",
		label: "Dispositivos",
	},
	{
		name: "profile",
		iconName: "person-outline",
		iconFocusedName: "person",
		iconType: "ionicons",
		label: "Perfil",
	},
];

export { TAB_CONFIGS };
