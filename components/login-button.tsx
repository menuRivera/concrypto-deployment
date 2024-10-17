import { useUser } from "@/hooks/use-user"
import Link from "next/link"

export default async function LoginButton() {
	const user = await useUser()

	// render a login/signup button if no user
	// if (!user) return <div style={{ display: 'flex' }}>
	return <div style={{ display: 'flex' }}>
		<Link href="/dashboard/sign-in">Sign in</Link>
		<Link href="/dashboard/sign-up">Sign up</Link>
	</div>

	// else, render the profile button
	// return <Link href='/dashboard/profile'>Hello, {user.email}</Link>
}
