'use server'

import { createClient } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils"
import { headers } from "next/headers"

export const updateAddress = async (formData: FormData) => {
	const addressId = formData.get('address-id') as string
	const address = formData.get('address') as string

	const pathname = headers().get('x-pathname') as string

	console.log({ pathname, address, addressId })

	const supabase = createClient()
	const { error } = await supabase
		.from('addresses')
		.update({ address: address })
		.eq('id', addressId)

	if (error) return encodedRedirect('error', pathname, error.message)
	return encodedRedirect('success', pathname, 'Address updated')
}
