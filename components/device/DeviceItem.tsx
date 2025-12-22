import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { TraccarDevice } from "@/types/api";
import formatLastUpdate from "@/utils/dateFormat";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { TouchableOpacity, View } from "react-native";
import { createDevicesStyles } from "./devices.styles";

interface DeviceCardProps {
	device: TraccarDevice;
	onPress?: () => void;
}

const DeviceItem: React.FC<DeviceCardProps> = ({ device, onPress }) => {
	const colorScheme = useColorScheme();
	const styles = createDevicesStyles(colorScheme ?? "light", device.status);

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						flex: 1,
					}}
				>
					<View style={styles.avatarContainer}>
						<MaterialIcons
							name="devices"
							size={22}
							color={styles.avatarText.color}
						/>
					</View>
					<View style={styles.deviceMainInfo}>
						<Text style={styles.deviceName} numberOfLines={1}>
							{device.name}
						</Text>
						<Text style={styles.deviceId}>{device.uniqueId}</Text>
					</View>
				</View>
				<View style={styles.statusBadge}>
					<Text style={styles.statusText}>{device.status}</Text>
				</View>
			</View>

			<View style={styles.divider} />

			<View style={styles.infoGrid}>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Last Update:</Text>
					<Text style={styles.infoValue}>
						{formatLastUpdate(device.lastUpdate)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default DeviceItem;
