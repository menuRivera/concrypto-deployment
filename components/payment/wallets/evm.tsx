'use client'

import { Chain } from "@/types/chains";
import { Box, Button } from "@mui/material";

interface IProps {
	chain: Chain
}
export default function Evm({ chain }: IProps) {
	return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<Button variant="contained">Connect EVM wallet</Button>
	</Box>
}
