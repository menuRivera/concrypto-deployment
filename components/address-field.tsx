'use client'

import { createAddress } from "@/actions/addresses/create-address"
import { getAddress } from "@/actions/addresses/get-address"
import { updateAddress } from "@/actions/addresses/update-address"
import { Address } from "@/types/addresses"
import { ApiKey } from "@/types/api-key"
import { Chain } from "@/types/chains"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
	chain: Chain,
	apiKey: ApiKey
}

/**
	* Create, show and edit addresses from the <address> table
*/
export default function AddressField({ chain, apiKey }: IProps) {
	const [loading, setLoading] = useState<boolean>(true)
	const [address, setAddress] = useState<Address | null>(null)
	const [inputState, setInputState] = useState<string>('')

	useEffect(() => {
		fetchAddress()
	}, [])

	const fetchAddress = async () => {
		const add = await getAddress(apiKey.id, chain.id)
		setAddress(add)
		setLoading(false)
	}

	const createOrUpdateAddress = async () => {
		if (address?.address === inputState) return
		else if (!address && inputState) return await createAddress(apiKey.id, chain.id, inputState)
		else if (address?.address != inputState) return await updateAddress(address!.id, inputState)
	}

	if (loading) return null

	return <div style={{ margin: '8px 0', display: 'flex', gap: '10px' }}>
		<TextField
			size="small"
			label={chain.name}
			placeholder="Address"
			value={address}
			onChange={(e) => setInputState(e.target.value)}
		/>
		<Button onClick={createOrUpdateAddress}>Save</Button>
	</div>
}
