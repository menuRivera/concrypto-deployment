import { Chain } from "@/types/chains"
import { createClient } from "@/utils/supabase/server"
import AddressField from "./address-field"
import { ApiKey } from "@/types/api-key"

interface IProps {
	apiKey: ApiKey
}

/**
	* A component that will display all of the available chains 
	* pay-with-crypto is compatible with, and ask the user for 
	* an address for each one of them
*/
export default async function ChainSelector({ apiKey }: IProps) {
	const supabase = createClient()
	const { data: chains, error } = await supabase
		.from('chains')
		.select()
		.returns<Chain[]>()

	if (!chains || error) return null

	return <div>
		{chains.map((chain, i) => (
			<AddressField key={i} chain={chain} apiKey={apiKey} />
		))}
	</div>
} 
