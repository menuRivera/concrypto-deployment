import { deleteKey } from "@/actions/api-keys/delete-key"
import ChainTable from "@/components/chain-table"
import { ApiKey } from "@/types/api-key"
import { createClient } from "@/utils/supabase/server"
import { Button, Paper } from "@mui/material"

interface IProps {
	params: {
		id: string
	}
}
// from here, user should be able to delete keys, 
// define wallets and whatever we decide to further 
// allow with these keys
export default async function ManageKeyPage({ params }: IProps) {
	const supabase = createClient()

	const { data: key, error } = await supabase
		.from('api-keys')
		.select()
		.eq('id', params.id)
		.single<ApiKey>()

	if (error) return <pre>{error.message}</pre>

	return <div>
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<h1>{key.label} key</h1>
			<form action={deleteKey}>
				<input type="text" value={key.id} name="id" hidden readOnly />
				<Button type="submit" color="error" variant="outlined" sx={{ marginTop: '8px' }}>Delete key</Button>
			</form>
		</div>
		<Paper sx={{ padding: '24px', margin: '16px 0' }}>
			<div><strong>Created at: </strong> {new Date(key.created_at).toLocaleString()}</div>
			<div><strong>Key: </strong> {key.key}</div>
		</Paper>

		<ChainTable apiKey={key} />

	</div>
}
