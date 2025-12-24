import { ApiError } from "@/types/api";

const RESPONSE_MESSAGES: Record<number, string> = {
	400: "Solicitud inválida. Por favor, verifica los datos ingresados.",
	401: "Datos incorrectos. Por favor, verifica tu correo electrónico y contraseña.",
	403: "Prohibido. No tienes permiso para realizar esta acción.",
	404: "Recurso no encontrado. Verifica la URL o el recurso solicitado.",
	500: "Error del servidor. Por favor, intenta más tarde.",
	503: "Servicio no disponible. Por favor, intenta más tarde.",
};

export const handleAuthError = (error: ApiError): string => {
	return (
		RESPONSE_MESSAGES[error.statusCode || 0] || "Error de autenticación."
	);
};

export const isAuthError = (error: unknown): error is ApiError => {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		"statusCode" in error
	);
};
