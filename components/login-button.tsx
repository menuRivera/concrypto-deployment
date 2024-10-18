import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export default async function LoginButton() {
	const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser()

	// render a login/signup button if no user
	if (!user) return null

	// else, render the profile button
	return <Link href='/dashboard/profile'>Hello, {user.email}</Link>
}
