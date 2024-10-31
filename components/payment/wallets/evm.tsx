'use client'

import { useEvmWallet } from "@/hooks/use-evm-wallet";
import { AddressWithChain } from "@/types/addresses";
import { Session } from "@/types/session";
import { Box, Button, CircularProgress } from "@mui/material";

interface IProps {
	total: number,
	address: AddressWithChain,
	session: Session
}
export default function Evm({ address, total }: IProps) {
	const { provider, signer, shortAddress } = useEvmWallet(address.chain)

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
