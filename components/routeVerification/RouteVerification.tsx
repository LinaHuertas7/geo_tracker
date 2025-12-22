import useAuthStore from "@/store/authStore";
import {
	Slot,
	usePathname,
	useRootNavigationState,
	useRouter,
} from "expo-router";
import { useEffect } from "react";

const RouteVerification = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isHydrated = useAuthStore((state) => state.isHydrated);
	const router = useRouter();
	const pathname = usePathname();
	const rootNavigationState = useRootNavigationState();

	useEffect(() => {
		console.log("rootNavigationState", rootNavigationState);
		if (!isHydrated || !rootNavigationState?.key) return;

		console.log("RouteVerification: isAuthenticated =", isAuthenticated);
		console.log("RouteVerification: pathname =", pathname);

		if (!isAuthenticated) {
			if (pathname !== "/") {
				console.log("RouteVerification: Redirecting to /");
				router.push("/");
			}
		} else if (pathname === "/") {
			console.log("RouteVerification: Redirecting to /(devices)/index");
			router.push("/(main)/devices");
		}
		// Only run when these are ready
	}, [isAuthenticated, isHydrated, pathname, router, rootNavigationState]);

	if (!isHydrated || !rootNavigationState?.key) return <Slot />;

	return <>{children}</>;
};

export default RouteVerification;
