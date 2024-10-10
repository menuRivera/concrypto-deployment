import { useUser } from "@/hooks/use-user"
import Link from "next/link"

export default async function LoginButton() {
	const user = await useUser()

	// render a login/signup button if no user
	if (!user) return <Link href='/dashboard/signin'>Login</Link>

	// else, render the profile button
	return <Link href='/dashboard/profile'>Hello, {user.email}</Link>
}
