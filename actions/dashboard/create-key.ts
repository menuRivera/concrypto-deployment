'use server'

import { createClient } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

/**
	* Server action to create a new api key
*/
export const createKey = async (formData: FormData) => {
	const label = formData.get('label') as string;
	const supabase = createClient()
	const { data: { user } } = await supabase.auth.getUser()

	if (!user) return encodedRedirect('error', '/dashboard', 'No user found')

	// create the actual api key
	const key = nanoid(64)

	// create the db record
	const { data, error } = await supabase
		.from('api-keys')
		.insert({
			label,
			user_id: user.id,
			key
		})
		.select('id')
		.single()

	if (error) return encodedRedirect('error', '/dashboard', error.message)

	// redirect user to the new key management page 
	return redirect(`/dashboard/keys/${data?.id}`)
}
