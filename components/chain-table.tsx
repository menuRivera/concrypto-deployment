import { Address } from "@/types/addresses";
import { ApiKey } from "@/types/api-key";
import { createClient } from "@/utils/supabase/server";
import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import CreateAddressModal from "./create-address-modal";
import { Chain } from "@/types/chains";
import AddressSwitch from "./address-switch";

interface IProps {
	apiKey: ApiKey
}
interface AddressWithChain extends Address {
	chain: Chain
}

export default async function ChainTable({ apiKey }: IProps) {
	const supabase = createClient()

	const { data: addresses } = await supabase
		.from('addresses')
		.select(`
				*,
				chain:chain_id(*)
			`)
		.eq('key_id', apiKey.id)
		.order('id', { ascending: true })
		.returns<AddressWithChain[]>()

	const { data: allChains } = await supabase
		.from('chains')
		.select()
		.returns<Chain[]>()

	const chains = allChains?.filter(c => !addresses?.find(a => a.chain_id === c.id))

	console.log({ addresses })

	return <Box>
		<Paper>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h6">Chains</Typography>
				{chains && <CreateAddressModal chains={chains} apiKey={apiKey} />}
			</Toolbar>

			<TableContainer>
				<Table>

					<TableHead>
						<TableRow>
							{/* <TableCell>ID</TableCell> */}
							<TableCell>Active</TableCell>
							<TableCell>Chain</TableCell>
							<TableCell>Address</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{addresses && addresses.map((a, i) => (
							<TableRow key={i}>
								{/* active checkbox */}
								<TableCell>
									<AddressSwitch addressId={a.id} defaultChecked={a.active} />
								</TableCell>
								<TableCell>{a.chain.name}</TableCell>
								<TableCell>{a.address}</TableCell>
								<TableCell>Delete or something idk</TableCell>
							</TableRow>
						))}
					</TableBody>

				</Table>
			</TableContainer>
		</Paper>
	</Box>
}
