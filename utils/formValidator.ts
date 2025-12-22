import { FormDataObject, ValidationResult } from "@/types/form";
import { loginSchema } from "@/utils/ValidationShema";
import * as yup from "yup";

const parseValidationError = (
	error: yup.ValidationError
): Record<string, string> => {
	const errors: Record<string, string> = {};

	error.inner.forEach((err) => {
		if (err.path) {
			errors[err.path] = err.message;
		}
	});

	return errors;
};

export const validateLoginForm = async (
	formData: FormDataObject
): Promise<ValidationResult> => {
	try {
		await loginSchema.validate(
			{ email: formData.email, password: formData.password },
			{ abortEarly: false }
		);
		return { isValid: true, errors: {} };
	} catch (error: any) {
		return {
			isValid: false,
			errors: parseValidationError(error),
		};
	}
};

export const validateForm = async (
	formData: FormDataObject
): Promise<ValidationResult> => {
	return validateLoginForm(formData);
};
