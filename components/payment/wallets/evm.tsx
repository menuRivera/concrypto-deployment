'use client'

import { useEvmWallet } from "@/hooks/use-evm-wallet";
import { Chain } from "@/types/chains";
import { Box, Button, CircularProgress } from "@mui/material";

interface IProps {
	chain: Chain
}
export default function Evm({ chain }: IProps) {
	const { provider, signer, shortAddress } = useEvmWallet(chain)

	const handleConnectWallet = async () => {
		await provider?.getSigner()
	}

	if (!signer) return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<Button variant="contained" onClick={handleConnectWallet}>Connect EVM wallet</Button>
	</Box>

	return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<Button>Connected as {shortAddress || <CircularProgress sx={{ marginLeft: '8px' }} size='16px' />}</Button>
	</Box>
}
