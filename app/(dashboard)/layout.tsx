import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import './dashboard.css'
import Logo from "@/components/logo";
import LoginButton from "@/components/login-button";

export const metadata: Metadata = {
	title: "Dashboard | Pay with Crypto",
	description: "Generated by create next app",
};

type IProps = Readonly<{ children: React.ReactNode }>

export default async function DashboardLayout({ children }: IProps) {
	return <html>
		<body>
			<AppRouterCacheProvider>
				<nav>
					<Logo />
					<LoginButton />
				</nav>

				<main>
					{children}
				</main>
			</AppRouterCacheProvider>
		</body>
	</html>
}
