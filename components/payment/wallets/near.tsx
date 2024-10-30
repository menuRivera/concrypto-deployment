'use client'

import HoverableButton from "@/components/common/hoverable-button";
import { useNearWalletSelector } from "@/hooks/use-near-wallet-selector";
import { Chain } from "@/types/chains";
import { Box, Button, LinearProgress } from "@mui/material";

interface IProps {
	chain: Chain
}
export default function Near({ chain }: IProps) {
	const { modal, loading, account, wallet } = useNearWalletSelector(chain.type)

	// loading state
	if (loading) return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<LinearProgress />
	</Box>

	// connect wallet button 
	else if (!account) return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<Button onClick={() => modal?.show()} variant="contained">Connect NEAR wallet</Button>
	</Box>

	// logged in flow
	return <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
		<HoverableButton
			onClick={() => wallet?.signOut()}
			variant="outlined"
			beforeHoverLabel={`Connected as: ${account}`}
			afterHoverLabel="Disconnect"
			beforeHoverColor="primary"
			afterHoverColor="error"
		/>

		<Button variant="contained">Pay</Button>
	</Box >
}
