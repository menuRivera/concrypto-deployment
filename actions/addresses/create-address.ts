'use server'

import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { encodedRedirect } from "@/utils/utils"

export const createAddress = async (formData: FormData) => {
	const supabase = createClient()
	const hdrs = headers()

	const keyId = formData.get('key-id') as string
	const chainId = formData.get('chain-id') as string
	const address = formData.get('address') as string

	const pathname = hdrs.get('x-pathname') as string

	const { error } = await supabase
		.from('addresses')
		.insert({
			key_id: keyId,
			chain_id: chainId,
			address
		})

	if (error) return encodedRedirect('error', pathname, error.message)

	return encodedRedirect('success', pathname, 'Address added')
}
