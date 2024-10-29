import ItemList from "@/components/payment/item-list"
import WalletPortal from "@/components/payment/wallet-portal"
import { Address } from "@/types/addresses"
import { Chain } from "@/types/chains"
import { Session } from "@/types/session"
import { createClient } from "@/utils/supabase/server"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
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

	const { data: chains } = await supabase
		.from('chains')
		.select()
		.returns<Chain[]>()

	// todo: change this
	if (!chains) return notFound()

	return <>
		<Typography variant="h2">{session.title}</Typography>
		<Grid container spacing={2}>
			<Grid size={6}>
				<ItemList session={session} />
			</Grid>
			<Grid size={6}>
				<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<WalletPortal chains={chains} />
				</Box>
			</Grid>
		</Grid>
	</>
}
