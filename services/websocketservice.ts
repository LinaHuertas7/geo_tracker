interface WebSocketInstance {
	connect: () => void;
	disconnect: () => void;
	addCallbacks: (messageType: string, callback: (data: any) => void) => void;
	removeCallbacks: (
		messageType: string,
		callback: (data: any) => void
	) => void;
	executeCallback: (messageType: string, data: any) => void;
}

class WebSocketService implements WebSocketInstance {
	socketRef: WebSocket | null;
	isConnected: boolean;
	reconnectAttempts: number;
	maxReconnectAttempts: number;
	timeout: number | null | undefined;
	callbacks: { [key: string]: ((data: any) => void)[] };

	static instance: WebSocketService | null = null;

	static getInstance(): WebSocketService {
		if (!WebSocketService.instance) {
			WebSocketService.instance = new WebSocketService();
		}
		return WebSocketService.instance;
	}

	private constructor() {
		this.socketRef = null;
		this.isConnected = false;
		this.reconnectAttempts = 0;
		this.maxReconnectAttempts = 5;
		this.timeout = null;
		this.callbacks = {};
	}

	connect() {
		if (this.socketRef) {
			return;
		}

		try {
			this.socketRef = new WebSocket("ws://demo.traccar.org/api/socket");
			console.log(
				"WebSocket object created, readyState:",
				this.socketRef.readyState
			);
		} catch (error) {
			console.error("Error creating WebSocket:", error);
			return;
		}

		this.socketRef.onopen = () => {
			console.log("WebSocket connected");
			this.isConnected = true;
			this.reconnectAttempts = 0;

			this.executeCallback("connect", { connected: true });
		};

		this.socketRef.onmessage = (e) => {
			try {
				const data = JSON.parse(e.data);
				console.log("PARSED DATA:", JSON.stringify(data, null, 2));
				console.log("Data keys:", Object.keys(data));

				if (data.devices) {
					console.log("Devices:", data.devices);
					this.executeCallback("devices", data.devices);
				}

				if (data.positions) {
					console.log("Positions:", data.positions);
					this.executeCallback("positions", data.positions);
				}

				if (data.events) {
					console.log("Events:", data.events);
					this.executeCallback("events", data.events);
				}

				this.executeCallback("message", data);
			} catch (error) {
				console.error("Error parsing message:", error);
			}
		};

		this.socketRef.onerror = (e) => {
			console.error("WebSocket error:", e);
			this.executeCallback("error", e);
		};

		this.socketRef.onclose = (e) => {
			console.log("WebSocket closed:", e.code, e.reason);

			this.isConnected = false;
			this.socketRef = null;

			if (this.reconnectAttempts < this.maxReconnectAttempts) {
				const delay = Math.min(
					1000 * 2 ** this.reconnectAttempts,
					30000
				);

				this.timeout = setTimeout(() => {
					this.reconnectAttempts++;
					this.connect();
				}, delay);
			} else {
				console.error("Max reconnection attempts reached");
			}
		};
	}

	disconnect() {
		if (this.socketRef) {
			this.socketRef.close(1000, "User disconnected");
			this.socketRef = null;
			this.isConnected = false;
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.reconnectAttempts = 0;
		}
	}

	addCallbacks(messageType: string, callback: (data: any) => void): void {
		if (!this.callbacks[messageType]) {
			this.callbacks[messageType] = [];
		}
		this.callbacks[messageType].push(callback);
	}

	removeCallbacks(messageType: string, callback: (data: any) => void): void {
		if (this.callbacks[messageType]) {
			this.callbacks[messageType] = this.callbacks[messageType].filter(
				(cb) => cb !== callback
			);
		}
	}

	executeCallback(messageType: string, data: any): void {
		if (this.callbacks[messageType]) {
			this.callbacks[messageType].forEach((callback) => callback(data));
		} else {
			console.log(`No callbacks registered for: ${messageType}`);
		}
	}
}

export default WebSocketService.getInstance();
