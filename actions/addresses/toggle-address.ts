'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const toggleAddress = async (addressId: number, newValue: boolean) => {
	const supabase = createClient()
	const { error } = await supabase
		.from('addresses')
		.update({
			active: newValue
		})
		.eq('id', addressId)

	if (error) console.log(error)

	revalidatePath('/dashboard/keys/[id]/page', 'page')
}
