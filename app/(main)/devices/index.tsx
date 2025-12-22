import DeviceItem from "@/components/device/DeviceItem";
import DeviceFilter from "@/components/device/DevicesFilter";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { TraccarDevice } from "@/types/api";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { createDevicesScreenStyles } from "./devices.styles";

const MOCK_DEVICES: TraccarDevice[] = [
	{
		id: 1,
		name: "Vehicle GPS Tracker",
		uniqueId: "VH-2023-001",
		status: "online",
		lastUpdate: new Date(Date.now() - 5 * 60000).toISOString(),
		model: "GT06N",
		contact: "John Doe",
		category: "vehicle",
		disabled: false,
	},
	{
		id: 2,
		name: "Delivery Truck 5",
		uniqueId: "DT-2023-005",
		status: "online",
		lastUpdate: new Date(Date.now() - 15 * 60000).toISOString(),
		model: "TK905",
		contact: "Maria Garcia",
		category: "vehicle",
		disabled: false,
	},
	{
		id: 3,
		name: "Personal Tracker",
		uniqueId: "PT-2023-012",
		status: "offline",
		lastUpdate: new Date(Date.now() - 2 * 3600000).toISOString(),
		model: "Mini A8",
		contact: "Sarah Johnson",
		category: "personal",
		disabled: false,
	},
];

export default function DevicesScreen() {
	const colorScheme = useColorScheme();
	const [activeFilter, setActiveFilter] = useState<
		"all" | "online" | "offline"
	>("all");

	const filteredDevices = useMemo(() => {
		if (activeFilter === "all") return MOCK_DEVICES;
		return MOCK_DEVICES.filter((device) => device.status === activeFilter);
	}, [activeFilter]);

	const deviceCount = useMemo(
		() => ({
			total: MOCK_DEVICES.length,
			online: MOCK_DEVICES.filter((d) => d.status === "online").length,
			offline: MOCK_DEVICES.filter((d) => d.status === "offline").length,
		}),
		[]
	);

	const styles = createDevicesScreenStyles(colorScheme ?? "light");

	return (
		<View style={styles.container}>
			<View style={styles.headerSection}>
				<View style={styles.headerTop}>
					<View>
						<Text style={styles.headerTitle}>Mis dispositivos</Text>
						<Text style={styles.headerSubtitle}>
							{deviceCount.total} dispositivo
							{deviceCount.total !== 1 ? "s" : ""} registrado
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.contentContainer}>
				<ScrollView
					style={styles.listContainer}
					showsVerticalScrollIndicator={false}
				>
					<DeviceFilter
						activeFilter={activeFilter}
						onFilterChange={setActiveFilter}
						deviceCount={deviceCount}
					/>

					<View style={styles.devicesContent}>
						{filteredDevices.length > 0 ? (
							filteredDevices.map((device) => (
								<DeviceItem
									key={device.uniqueId}
									device={device}
									onPress={() =>
										console.log(
											"Device pressed:",
											device.name
										)
									}
								/>
							))
						) : (
							<View style={styles.emptyState}>
								<Text style={styles.emptyIcon}>📱</Text>
								<Text style={styles.emptyText}>
									No devices found{"\n"}
									Try adjusting your filters
								</Text>
							</View>
						)}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}
