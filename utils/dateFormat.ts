const formatLastUpdate = (lastUpdate?: string) => {
	if (!lastUpdate) return "Never";
	const date = new Date(lastUpdate);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const minutes = Math.floor(diff / 60000);

	if (minutes < 1) return "Just now";
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	return date.toLocaleDateString();
};

export default formatLastUpdate;
