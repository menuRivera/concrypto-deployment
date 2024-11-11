import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import './dashboard.css'
import Logo from "@/components/logo";
import LoginButton from "@/components/login-button";
import { Container } from "@mui/material";
import FeedbackToast from "@/components/dashboard/feedback-toast";

export const metadata: Metadata = {
	title: "Dashboard | ConCrypto",
	description: "Generated by create next app",
};

type IProps = Readonly<{ children: React.ReactNode }>

export default async function DashboardLayout({ children }: IProps) {
	return <html>
		<body>
			<AppRouterCacheProvider>
				<nav>
					<Logo to="/dashboard" />
					<LoginButton />
				</nav>

				<main>
					<Container>
						{children}
					</Container>
				</main>
				<FeedbackToast />
			</AppRouterCacheProvider>
		</body>
	</html>
}
