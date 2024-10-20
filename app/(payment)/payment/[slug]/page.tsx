import { Address } from "@/types/addresses"
import { Chain } from "@/types/chains"
import { Session } from "@/types/session"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

interface AddressWithChain extends Address {
	chain: Chain
}

export default async function SessionUI({ params }: { params: { slug: string } }) {
	const supabase = createClient()

	const { data: session } = await supabase
		.from('sessions')
		.select()
		.eq('slug', params.slug)
		.single<Session>()

	if (!session) return notFound()

	const { data: addresses } = await supabase
		.from('addresses')
		.select(`*, chain:chain_id(*)`)
		.eq('key_id', session.key_id)
		.returns<AddressWithChain[]>()


	const totalAmount = session.items.reduce((acc, curr, _index) => acc + curr.unit_price, 0)

	return <>
		<h1>{session.title}</h1>
		<pre>{JSON.stringify(session)}</pre>
		<pre>{JSON.stringify(addresses)}</pre>
		<pre>total: {totalAmount}</pre>
	</>
}
