import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { TraccarDevice } from "@/types/api";
import { Text } from "@react-navigation/elements";
import { TouchableOpacity, View } from "react-native";
import { createDevicesStyles } from "./devices.styles";

interface DeviceCardProps {
	device: TraccarDevice;
	onPress?: () => void;
}

const DeviceItem: React.FC<DeviceCardProps> = ({ device, onPress }) => {
	const formatLastUpdate = (lastUpdate?: string) => {
		if (!lastUpdate) return "Never";
		const date = new Date(lastUpdate);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		return date.toLocaleDateString();
	};

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
					<View style={styles.avatarContainer}></View>
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
