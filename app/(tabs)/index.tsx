import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Text } from "@react-navigation/elements";
import { View } from "react-native";

export const Index = () => {
	const colorScheme = useColorScheme();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
			}}
		>
			<Text
				style={{
					color: colorScheme === "dark" ? "#fff" : "#000",
					fontSize: 20,
					textAlign: "center",
					marginTop: 50,
				}}
			>
				Welcome to the Geo Tracker App!
			</Text>
		</View>
	);
};
