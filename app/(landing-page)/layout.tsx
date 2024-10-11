import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "./landing.css";
import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@mui/material";

export const metadata: Metadata = {
	title: "Pay with Crypto",
	description: "Generated by create next app",
};

type IProps = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: IProps) {
	return <html>
		<body>
			<AppRouterCacheProvider>

				<nav>
					<Logo />
					<div>
						<Link href="/about">About us</Link>
						<Link href="/how-it-works">How it works</Link>
						<Link href="/pricing">Pricing</Link>
					</div>
					<div>
						<Button variant="contained" href="/dashboard">Dashboard</Button>
					</div>
				</nav>

				<main>
					{children}
				</main>

			</AppRouterCacheProvider>
		</body>
	</html>
}
