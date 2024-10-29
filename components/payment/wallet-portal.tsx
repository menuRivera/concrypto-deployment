'use client'

import { Chain } from "@/types/chains";
import { Button, Card, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface IProps {
	chains: Chain[]
}
export default function WalletPortal({ chains }: IProps) {
	const [chain, setChain] = useState<Chain>(chains[0])

	const handleChainSelection = (e: SelectChangeEvent) => {
		setChain(chains.find(c => c.id.toString() == e.target.value)!)
	}

	return <Card sx={{ width: '100%', display: 'flex', padding: '8px', gap: '8px', flexDirection: 'column' }}>

		<Select variant="outlined" value={chain.id.toString()} onChange={handleChainSelection}>
			{chains.map((c, i) => (
				<MenuItem key={i} value={c.id}>{c.name}</MenuItem>
			))}
		</Select>

		<Button variant="contained">Connect Wallet</Button>
	</Card>
}
