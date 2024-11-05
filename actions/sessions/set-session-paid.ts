'use server'

import { Chain } from "@/types/chains";
import { Session } from "@/types/session";
import { createClient } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
	* Server action to update the state of a session; will redirect user to success url
*/
export const setSessionPaid = async (chainId: number, txHash: string, sessionId: number) => {
	const supabase = createClient()
	const pathname = headers().get('x-pathname') as string

	const { data: chain } = await supabase
		.from('chains')
		.select()
		.eq('id', chainId)
		.single<Chain>()

	if (!chain) return encodedRedirect('error', pathname, 'No chain found')

	const { data: session } = await supabase
		.from('sessions')
		.update({ paid: true })
		.eq('id', sessionId)
		.select('*')
		.single<Session>()

	if (!session) return encodedRedirect('error', pathname, 'No session found')

	const params = new URLSearchParams()
	params.set('chainId', chainId.toString())
	params.set('txHash', txHash)

	// webhook call?

	return redirect(`${session.urls.success}?${params.toString()}`)
}
