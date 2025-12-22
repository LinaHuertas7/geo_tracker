import { useRef } from "react";

export const useFormData = () => {
	const formDataRef = useRef<FormData>(new FormData());

	const setFieldValue = (name: string, value: any) => {
		formDataRef.current.set(name, value);
	};

	const getFieldValue = (name: string) => {
		return formDataRef.current.get(name);
	};

	const reset = () => {
		formDataRef.current = new FormData();
	};

	const toObject = () => {
		const obj: Record<string, any> = {};
		formDataRef.current.forEach((value, key) => {
			obj[key] = value;
		});
		return obj;
	};

	return {
		formData: formDataRef.current,
		setFieldValue,
		getFieldValue,
		reset,
		toObject,
	};
};
