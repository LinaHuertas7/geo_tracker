import { createButtonStyles } from "@/components/button/button.styles";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { ButtonProps } from "@/types/form";
import { Text } from "@react-navigation/elements";
import { Pressable } from "react-native";

const Button: React.FC<ButtonProps> = ({ title, onPress, loading = false, disabled = false, variant = 'primary', style }) => {

	const colorScheme = useColorScheme();
	const styles = createButtonStyles(colorScheme ?? 'light');

	return (
		<Pressable
		style={({ pressed }) => [
			variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
			pressed && styles.buttonPressed,
			disabled && styles.buttonDisabled,
			style,
		]}
		onPress={onPress}
		disabled={disabled || loading}
		>
		<Text style={variant === 'primary' ? styles.buttonTextPrimary : styles.buttonTextSecondary}>
			{loading ? 'Cargando...' : title}
		</Text>
		</Pressable>
	);

}

export default Button;
