import useAuthStore from "@/store/authStore";
import { Redirect, usePathname } from "expo-router";
import Loading from "../loading/Loadig";

const RouteVerification = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isHydrated = useAuthStore((state) => state.isHydrated);
	const pathname = usePathname();

	if (!isHydrated) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		if (pathname !== "/") {
			return <Redirect href="/" />;
		}
	} else if (pathname === "/") {
		return <Redirect href="/(main)/devices" />;
	}

	return <>{children}</>;
};

export default RouteVerification;
