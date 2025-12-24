import { createProfileStyles } from "@/app/(main)/profile/profile.styles";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { TouchableOpacity, View } from "react-native";

interface ProfileItemProps {
	iconsName: any;
	label: string;
}

const ProfileItem = ({ iconsName, label }: ProfileItemProps) => {
	const colorScheme = useColorScheme();
	const styles = createProfileStyles(colorScheme ?? "light");
	const colors = Colors[colorScheme ?? "light"];

	return (
		<TouchableOpacity style={styles.menuItem}>
			<View style={styles.menuIconContainer}>
				<Ionicons name={iconsName} size={20} color={colors.text} />
			</View>
			<Text style={styles.menuText}>{label}</Text>
			<Ionicons name="chevron-forward" size={20} color={colors.text} />
		</TouchableOpacity>
	);
};

export default ProfileItem;
