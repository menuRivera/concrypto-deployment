import { Box, Button } from "@mui/material";

export default function Home() {
	return <Box sx={{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '70vh',
		justifyContent: 'center',
		gap: '50px'
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
			Give your users the ability to pay with any cryptocurrency, without the hassle of implementing them yourself
		</p>

		<Button variant="contained" sx={{
			fontSize: '16px',
		}}>
			Start building
		</Button>
	</Box>
}
