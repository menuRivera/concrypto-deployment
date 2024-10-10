import type { Metadata } from "next";
import './dashboard.css'
import Logo from "@/components/ui/logo";
import LoginButton from "@/components/login-button";

export const metadata: Metadata = {
	title: "Dashboard | Pay with Crypto",
	description: "Generated by create next app",
};

type IProps = Readonly<{ children: React.ReactNode }>


export default async function DashboardLayout({ children }: IProps) {
	return <html>
		<body>

			<nav>
				<Logo />
				<LoginButton />
			</nav>

			<main>
				{children}
			</main>
		</body>
	</html>
}
