import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "./landing.css";
import Link from "next/link";
import Logo from "@/components/logo";
import { Button, Container } from "@mui/material";

export const metadata: Metadata = {
	title: "ConCrypto",
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
						<Link href="/about-us">About us</Link>
						<Link href="/how-it-works">How it works</Link>
						<Link href="/pricing">Pricing</Link>
					</div>
					<div>
						<Button id="cta" variant="contained" href="/dashboard">Dashboard</Button>
					</div>
				</nav>

				<main>
					<Container>
						{children}
					</Container>
				</main>

			</AppRouterCacheProvider>
		</body>
	</html>
}
