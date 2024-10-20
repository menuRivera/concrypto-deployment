'use server'

import { createClient } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils"
import { headers } from "next/headers"


export const deleteAddress = async (id: number) => {
	const supabase = createClient()
	const pathname = headers().get('x-pathname') as string

	const { error } = await supabase
		.from('addresses')
		.delete()
		.eq('id', id)

	if (error) encodedRedirect('error', pathname, error.message)

	encodedRedirect('success', pathname, 'Chain deleted')
}
