import { createLoadingStyles } from "@/components/loading/loading.styles";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Text } from "@react-navigation/elements";
import { ActivityIndicator, View } from "react-native";

const Loading = () => {
	const colorScheme = useColorScheme();
	const styles = createLoadingStyles(colorScheme ?? "light");
	const colors = Colors[colorScheme ?? "light"];

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={colors.icon} />
			<Text style={styles.loadingText}>Cargando...</Text>
		</View>
	);
};
export default Loading;
