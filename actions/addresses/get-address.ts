'use server'

import { Address } from "@/types/addresses"
import { createClient } from "@/utils/supabase/server"

/**
	* Returns the address with the given specs if any
*/
export const getAddress = async (key_id: number, chain_id: number) => {
	const supabase = createClient()

	const { data: address, error } = await supabase
		.from('addresses')
		.select()
		.eq('key_id', key_id)
		.eq('chain_id', chain_id)
		.single<Address>()

	if (error) console.error(error.message)
	return address
}
