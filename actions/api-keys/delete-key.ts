'use server'

import { createClient } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils"

/**
	* Server action to delete 
*/
export const deleteKey = async (formData: FormData) => {
	const id = formData.get('id') as string;
	console.log({ id })
	const supabase = createClient()
	const { error } = await supabase
		.from('api-keys')
		.delete()
		.eq('id', id)

	if (error) return encodedRedirect('error', '/dashboard', error.message)

	return encodedRedirect('success', '/dashboard', 'Successfully deleted key')
}
