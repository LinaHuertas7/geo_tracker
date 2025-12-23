export const filters = [
	{ key: "all", label: "All", countKey: "total" as const },
	{ key: "online", label: "Online", countKey: "online" as const },
	{ key: "offline", label: "Offline", countKey: "offline" as const },
] as const;

export const statusConfig: Record<
	string,
	{ color: string; label: string; bgColor: string }
> = {
	online: { color: "#4CD964", label: "En línea", bgColor: "#4CD96420" },
	offline: {
		color: "#ce8e8eff",
		label: "Sin conexión",
		bgColor: "#ce8e8eff",
	},
	unknown: {
		color: "#8E8E93",
		label: "Desconocido",
		bgColor: "#8E8E9320",
	},
};
