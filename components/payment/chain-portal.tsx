'use client'

import { Chain } from "@/types/chains";
import { Card, LinearProgress, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Evm from "./wallets/evm";
import Near from "./wallets/near";
import { AddressWithChain } from "@/types/addresses";

interface IProps {
	addresses: AddressWithChain[]
}
export default function ChainPortal({ addresses }: IProps) {
	const chains = addresses.map(a => a.chain)
	const [chain, setChain] = useState<Chain>(chains[0])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const chainId = localStorage.getItem('pwc-chain-id')
		if (chainId) setChain(chains.find(c => c.id.toString() == chainId)!)
		setLoading(false)
	}, [])

	const handleChainSelection = (e: SelectChangeEvent) => {
		const chainId = e.target.value
		setChain(chains.find(c => c.id.toString() == chainId)!)
		localStorage.setItem('pwc-chain-id', chainId)
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


	if (loading) return <Card sx={{ width: '100%', display: 'flex', padding: '8px', gap: '8px', flexDirection: 'column' }}>
		<LinearProgress />
	</Card>

	return <Card sx={{ width: '100%', display: 'flex', padding: '8px', gap: '8px', flexDirection: 'column' }}>

		<Select variant="outlined" value={chain.id.toString()} onChange={handleChainSelection}>
			{chains.map((c, i) => (
				<MenuItem key={i} value={c.id}>{c.name}</MenuItem>
			))}
		</Select>

		{/*
			todo: rerender on chain selection
			(same sdk doesn't cause a rerender)
		*/}
		<WalletConnection chain={chain} />
	</Card>
}
