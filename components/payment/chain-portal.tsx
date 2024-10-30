'use client'

import { Chain } from "@/types/chains";
import { Card, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";
import Evm from "./wallets/evm";
import Near from "./wallets/near";
import { AddressWithChain } from "@/types/addresses";

interface IProps {
	addresses: AddressWithChain[]
}
export default function ChainPortal({ addresses }: IProps) {
	const chains = addresses.map(a => a.chain)

	const [chain, setChain] = useState<Chain>(chains[0])

	const handleChainSelection = (e: SelectChangeEvent) => {
		setChain(chains.find(c => c.id.toString() == e.target.value)!)
	}

	const WalletConnection = useMemo(() => {
		switch (chain.sdk) {
			case 'evm':
				return Evm;
			case 'near':
				return Near;
			default:
				// this should never run
				return Evm;
		}
	}, [chain])

	return <Card sx={{ width: '100%', display: 'flex', padding: '8px', gap: '8px', flexDirection: 'column' }}>

		<Select variant="outlined" value={chain.id.toString()} onChange={handleChainSelection}>
			{chains.map((c, i) => (
				<MenuItem key={i} value={c.id}>{c.name}</MenuItem>
			))}
		</Select>

		<WalletConnection chain={chain} />
	</Card>
}
