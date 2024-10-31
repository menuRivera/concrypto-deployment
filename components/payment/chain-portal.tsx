'use client'

import { Card, LinearProgress, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Evm from "./wallets/evm";
import Near from "./wallets/near";
import { AddressWithChain } from "@/types/addresses";
import { Session } from "@/types/session";

interface IProps {
	addresses: AddressWithChain[],
	session: Session
}
export default function ChainPortal({ addresses, session }: IProps) {
	const total: number = session.items.reduce((prev, curr, _index) => (curr.unit_price * curr.quantity) + prev, 0)

	const [address, setAddress] = useState<AddressWithChain>(addresses[0])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const addressId = localStorage.getItem(`pwc-address-id-${session.id}`)
		if (addressId) setAddress(addresses.find(a => a.id === Number(addressId))!)
		setLoading(false)
	}, [])

	const handleAddressSelection = (e: SelectChangeEvent) => {
		const addressId = e.target.value
		setAddress(addresses.find(a => a.id === Number(addressId))!)
		localStorage.setItem(`pwc-address-id-${session.id}`, addressId)
	}

	const WalletConnection = useMemo(() => {
		switch (address.chain.sdk) {
			case 'evm':
				return Evm;
			case 'near':
				return Near;
			default:
				// this should never run
				return Evm;
		}
	}, [address])



	if (loading) return <Card sx={{ width: '100%', display: 'flex', padding: '8px', gap: '8px', flexDirection: 'column' }}>
		<LinearProgress />
	</Card>

	return <Card sx={{ width: '100%', display: 'flex', padding: '8px', gap: '8px', flexDirection: 'column' }}>

		<Select variant="outlined" value={address.id.toString()} onChange={handleAddressSelection}>
			{addresses.map((a, i) => (
				<MenuItem key={i} value={a.id}>{a.chain.name}</MenuItem>
			))}
		</Select>

		{/*
			todo: rerender on chain selection
			(same sdk doesn't cause a rerender)
		*/}
		<WalletConnection total={total} address={address} session={session} />
	</Card>
}
