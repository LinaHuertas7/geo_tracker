import AuthHeader from "@/components/auth/AuthHeader";
import Input from "@/components/form/Input";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, useColorScheme, View } from "react-native";

import Button from "@/components/button/Button";
import useAuthStore from "@/store/authStore";
import { handleAuthError, isAuthError } from "@/utils/errorHandler";
import { validateForm } from "@/utils/formValidator";
import { createAuthStyles } from "./auth.styles";

export default function HomeScreen() {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
		name: "",
	});

	const colorScheme = useColorScheme();
	const styles = createAuthStyles(colorScheme ?? "light");
	const router = useRouter();

	const { isAuthenticated, login, loading } = useAuthStore();

	const handleInputChange = (name: string, value: string) => {
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAuth = async () => {
		const { isValid, errors: validationErrors } = await validateForm(
			formValues
		);

		if (!isValid) {
			setErrors(validationErrors);
			return;
		}

		setErrors({});

		try {
			const formDataToSend = new FormData();
			formDataToSend.set("email", formValues.email);
			formDataToSend.set("password", formValues.password);

			await login(formDataToSend);

			if (isAuthenticated) {
				router.replace("/(main)/devices");
			}

			setFormValues({
				email: "",
				password: "",
				name: "",
			});
		} catch (error) {
			if (isAuthError(error)) {
				const message = handleAuthError(error);
				setErrors({ general: message });
			} else {
				setErrors({
					general: "Authentication failed. Please try again.",
				});
			}
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollContent}
			showsVerticalScrollIndicator={false}
		>
			<View>
				<AuthHeader
					title="Iniciar Sesión"
					subtitle="Bienvenido de nuevo, ingresa tus datos para continuar"
				/>

				<View>
					<Input
						label="Correo Electrónico"
						placeholder="example@gmail.com"
						value={formValues.email}
						onChangeText={(text) =>
							handleInputChange("email", text)
						}
						keyboardType="email-address"
						error={errors.email}
					/>

					<View style={styles.passwordContainer}>
						<Input
							label="Contraseña"
							placeholder="••••••••••"
							value={formValues.password}
							onChangeText={(text) =>
								handleInputChange("password", text)
							}
							isPassword
							error={errors.password}
						/>

						{errors.general && (
							<Text style={styles.errorText}>
								{errors.general}
							</Text>
						)}

						<Text style={styles.forgotPasswordText}>
							Forgot Password?
						</Text>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						title="Iniciar Sesión"
						onPress={handleAuth}
						loading={loading}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
