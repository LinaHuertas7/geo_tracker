import DeviceItem from "@/components/device/DeviceItem";
import DeviceFilter from "@/components/device/DevicesFilter";
import Loading from "@/components/loading/Loadig";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useDevicesStore from "@/store/devicesStore";
import { TraccarDevice } from "@/types/api";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { createDevicesScreenStyles } from "./devices.styles";

export default function DevicesScreen() {
	const colorScheme = useColorScheme();
	const [activeFilter, setActiveFilter] = useState<
		"all" | "online" | "offline"
	>("all");

	const [refreshing, setRefreshing] = useState(false);

	const devices = useDevicesStore((state) => state.devices);
	const getDevices = useDevicesStore((state) => state.getDevices);

	const loading = useDevicesStore((state) => state.loading);

	const selectDevice = useDevicesStore((state) => state.selectDevice);
	const router = useRouter();

	useEffect(() => {
		getDevices();
	}, [getDevices]);

	const onRefresh = async () => {
		setRefreshing(true);
		await getDevices();
		setRefreshing(false);
	};

	const filteredDevices = useMemo(() => {
		if (activeFilter === "all") return devices;
		return devices.filter((device) => device.status === activeFilter);
	}, [activeFilter, devices]);

	const deviceCount = useMemo(
		() => ({
			total: devices.length,
			online: devices.filter((d) => d.status === "online").length,
			offline: devices.filter((d) => d.status === "offline").length,
		}),
		[devices]
	);

	const handleSelectDevice = (device: TraccarDevice) => {
		selectDevice(device);
		router.push("/(main)/map");
	};

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
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<DeviceFilter
						activeFilter={activeFilter}
						onFilterChange={setActiveFilter}
						deviceCount={deviceCount}
					/>

					{loading ? (
						<View style={styles.loadingContainer}>
							<Loading />
						</View>
					) : (
						<View style={styles.devicesContent}>
							{filteredDevices.length > 0 ? (
								filteredDevices.map((device) => (
									<DeviceItem
										key={device.uniqueId}
										device={device}
										onPress={() =>
											handleSelectDevice(device)
										}
									/>
								))
							) : (
								<View style={styles.emptyState}>
									<Text style={styles.emptyText}>
										No se encontraron dispositivos{"\n"}
										Intenta ajustar tus filtros
									</Text>
								</View>
							)}
						</View>
					)}
				</ScrollView>
			</View>
		</View>
	);
}
