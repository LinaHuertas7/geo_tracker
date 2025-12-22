import { ViewStyle } from "react-native";

export interface AuthInputProps {
	label?: string;
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	isPassword?: boolean;
	error?: string;
	editable?: boolean;
	keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
}

export interface ButtonProps {
	title: string;
	onPress: () => void;
	loading?: boolean;
	disabled?: boolean;
	variant?: "primary" | "secondary";
	style?: ViewStyle;
}

export interface AuthHeaderProps {
	title: string;
	subtitle?: string;
}
export interface FormDataObject {
	email: string;
	password: string;
	name?: string;
	confirmPassword?: string;
}

export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}
