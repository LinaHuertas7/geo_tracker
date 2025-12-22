import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Text } from "@react-navigation/elements";
import { TouchableOpacity, View } from "react-native";
import { createDevicesFilterStyles } from "./devicesFilter.styles";

interface DeviceFilterProps {
	activeFilter: "all" | "online" | "offline";
	onFilterChange: (filter: "all" | "online" | "offline") => void;
	deviceCount: { total: number; online: number; offline: number };
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({
	activeFilter,
	onFilterChange,
	deviceCount,
}) => {
	const colorScheme = useColorScheme();

	const filters = [
		{ key: "all" as const, label: "All", count: deviceCount.total },
		{ key: "online" as const, label: "Online", count: deviceCount.online },
		{
			key: "offline" as const,
			label: "Offline",
			count: deviceCount.offline,
		},
	];

	const styles = createDevicesFilterStyles(colorScheme ?? "light");

	return (
		<View style={styles.filterContainer}>
			{filters.map((filter) => (
				<TouchableOpacity
					key={filter.key}
					style={[
						styles.filterButton,
						activeFilter === filter.key &&
							styles.filterButtonActive,
					]}
					onPress={() => onFilterChange(filter.key)}
					activeOpacity={0.7}
				>
					<Text
						style={[
							styles.filterText,
							activeFilter === filter.key &&
								styles.filterTextActive,
						]}
					>
						{filter.label} ({filter.count})
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default DeviceFilter;
