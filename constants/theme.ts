import { Platform } from "react-native";

const tintColorLight = "#04c3a6";
const tintColorDark = "#04c3a6";

export const Colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		tint: tintColorLight,
		icon: "#04c3a6",
		tabIconDefault: "#04c3a6",
		tabIconSelected: tintColorLight,
		primary: "#04c3a6",
		primaryDark: "#04a08f",
		surface: "#FAFAFA",
		border: "#E0E0E0",
		textSecondary: "#757575",
		placeholder: "#9E9E9E",
		filterChipBackground: "#262535ff",
		outerCircle: "##6a82ba66",
		innerCircle: "#5B7BC6",
		fillColor: "#4a90e233",
		strokeColor: "#4a90e280",
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		icon: "#04c3a6",
		tabIconDefault: "#04c3a6",
		tabIconSelected: tintColorDark,
		primary: "#04c3a6",
		primaryDark: "#04a08fs",
		surface: "#1E1E1E",
		border: "#424242",
		textSecondary: "#B0B0B0",
		filterChipBackground: tintColorDark,
		placeholder: "#616161",
		outerCircle: "#6a82ba66",
		innerCircle: "#5B7BC6",
		fillColor: "#4a90e233",
		strokeColor: "#4a90e280",
	},
};

export const Fonts = Platform.select({
	ios: {
		sans: "system-ui",
		serif: "ui-serif",
		rounded: "ui-rounded",
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});
