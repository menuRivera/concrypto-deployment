import { Box, Button } from "@mui/material";

export default function Home() {
	return <Box className="landing-gradient" sx={{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '70vh',
		justifyContent: 'center',
		gap: '50px',
	}}>
		<h1 style={{
			fontWeight: 500,
			fontSize: '64px'
		}}>
			Pay with crypto.
		</h1>

		<p style={{
			fontSize: '24px',
			textAlign: 'center'
		}}>
			Unlock effortless crypto payments for your users by abstracting away chain-specific implementations
		</p>

		<Button variant="contained" sx={{ fontSize: '16px', }} href="/dashboard">
			Start building
		</Button>
	</Box>
}
