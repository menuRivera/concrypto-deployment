import ApiKeys from "@/components/dashboard/api-keys"
import { Box } from "@mui/material"

export default async function Dashboard() {
	return <Box>
		<h1 style={{ marginBottom: '16px' }}>Dashboard</h1>

		<ApiKeys />
	</Box>
}
