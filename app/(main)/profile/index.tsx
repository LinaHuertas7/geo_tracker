import { createProfileStyles } from "@/app/(main)/profile/profile.styles";
import { ProfileItem, profileItems } from "@/constants/profile";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import useAuthStore from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
	const logout = useAuthStore((state) => state.logout);
	const user = useAuthStore((state) => state.user);

	const handleLogout = () => {
		logout();
	};

	const getInitial = (email: string) => {
		return email ? email.charAt(0).toUpperCase() : "Li";
	};

	const colorScheme = useColorScheme();
	const styles = createProfileStyles(colorScheme ?? "light");
	const colors = Colors[colorScheme ?? "light"];

	return (
		<View style={styles.container}>
			<View style={styles.header}></View>

			<View style={styles.content}>
				<View style={styles.avatarContainer}>
					<View style={styles.avatarCircle}>
						<Text style={styles.avatarText}>
							{getInitial(user?.email || "")}
						</Text>
					</View>
					<View style={styles.checkBadge}>
						<Ionicons name="checkmark" size={16} color="white" />
					</View>
				</View>

				<View style={styles.menuContainer}>
					{profileItems.map((item: ProfileItem) => (
						<TouchableOpacity
							key={item.key}
							style={styles.menuItem}
						>
							<View style={styles.menuIconContainer}>
								<Ionicons
									name={item.iconName}
									size={20}
									color={colors.text}
								/>
							</View>
							<Text style={styles.menuText}>{item.label}</Text>
							<Ionicons
								name="chevron-forward"
								size={20}
								color={colors.text}
							/>
						</TouchableOpacity>
					))}
				</View>

				<TouchableOpacity
					style={styles.logoutButton}
					onPress={handleLogout}
				>
					<Ionicons
						name="log-out-outline"
						size={20}
						color={colors.text}
					/>
					<Text style={styles.logoutText}>Cerrar sesión</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
