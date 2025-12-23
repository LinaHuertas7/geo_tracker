import { createMapStyles } from "@/components/maps/maps.native.styles";
import { View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

const NavigationMarker = ({
	colorScheme,
}: {
	colorScheme: "light" | "dark";
}) => {
	const styles = createMapStyles(colorScheme);

	return (
		<View style={styles.markerContainer}>
			<View style={styles.outerCircle}>
				<View style={styles.innerCircle}>
					<Svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						style={styles.triangle}
					>
						<Polygon points="12,6 16,18 12,15 8,18" fill="white" />
					</Svg>
				</View>
			</View>
		</View>
	);
};

export default NavigationMarker;
