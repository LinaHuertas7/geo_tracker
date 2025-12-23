const formatLastUpdate = (lastUpdate?: string) => {
	if (!lastUpdate) return "Desconocido";
	const date = new Date(lastUpdate);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const minutes = Math.floor(diff / 60000);

	if (minutes < 1) return "Justo ahora";
	if (minutes < 60) return `${minutes}m antes`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h antes`;
	return date.toLocaleDateString();
};

export default formatLastUpdate;
