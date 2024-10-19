import { createClient } from "@/utils/supabase/server"
import { Box, Paper, Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import CreateKeyModal from "../create-key-modal"

/** 
	* retrieve all api keys	and renders them in a table
*/
export default async function ApiKeys() {
	const supabase = createClient()
	const { data: { user } } = await supabase.auth.getUser()

	if (!user) return null

	const { data: apiKeys, error } = await supabase
		.from('api-keys')
		.select('*')
		.eq('user_id', user.id)

	if (error) return <div>
		{error.message}
	</div>

	if (!apiKeys) return null

	return <Box>
		<Paper>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h6">API keys</Typography>
				<CreateKeyModal />
			</Toolbar>

			<TableContainer>
				<Table>

					<TableHead>
						<TableRow>
							{/* <TableCell>ID</TableCell> */}
							<TableCell>Created at</TableCell>
							<TableCell>Label</TableCell>
							<TableCell>Key</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{apiKeys.map((k, i) => (
							<TableRow key={i}>
								<TableCell>{new Date(k.created_at).toLocaleString()}</TableCell>
								<TableCell>{k.label}</TableCell>
								<TableCell>{k.key}</TableCell>
								<TableCell align="right"><Button href={`/dashboard/keys/${k.id}`}>Manage</Button></TableCell>
							</TableRow>
						))}
					</TableBody>

				</Table>
			</TableContainer>
		</Paper>
	</Box>
}
