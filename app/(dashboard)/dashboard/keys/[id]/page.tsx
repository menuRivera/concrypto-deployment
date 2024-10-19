import { deleteKey } from "@/actions/api-keys/delete-key"
import { ApiKey } from "@/types/api-key"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@mui/material"

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
		<h1>Manage key</h1>
		<h2 style={{ marginTop: '16px' }}>Basic info</h2>
		<div><strong>Label: </strong> {key.label}</div>
		<div><strong>Created at: </strong> {new Date(key.created_at).toLocaleString()}</div>
		<div><strong>Key: </strong> {key.key}</div>

		<h2 style={{ marginTop: '16px' }}>Chains</h2>
		<p>Here would be rendered a list of your connected chains and accounts</p>

		<form action={deleteKey}>
			<input type="text" value={key.id} name="id" hidden readOnly />
			<Button type="submit" color="error" variant="contained" sx={{ marginTop: '16px' }}>Delete</Button>
		</form>
	</div>
}
