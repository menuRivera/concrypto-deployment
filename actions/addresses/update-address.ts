'use server'

import { createClient } from "@/utils/supabase/server"

export const updateAddress = async (addressId: number, newAddress: string) => {
	const supabase = createClient()
	const { error } = await supabase
		.from('addresses')
		.update({
			address: newAddress
		})
		.eq('id', addressId)

	if (error) return console.error(error)
}
