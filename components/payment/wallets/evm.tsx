'use client'

import { setSessionPaid } from "@/actions/sessions/set-session-paid";
import { useEvmWallet } from "@/hooks/use-evm-wallet";
import { AddressWithChain } from "@/types/addresses";
import { Session } from "@/types/session";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { ethers } from "ethers";
import assert from 'assert'
import { useEffect, useState } from "react";

interface IProps {
	total: number,
	address: AddressWithChain,
	session: Session
}
export default function Evm({ address, total, session }: IProps) {
	const { provider, signer, shortAddress } = useEvmWallet(address.chain)
	const [loading, setLoading] = useState<boolean>(false)
	const [etherPrice, setEtherPrice] = useState<number | null>(null)

	useEffect(() => {
		fetchEtherPrice()
	}, [])

	const handleConnectWallet = async () => {
		await provider?.getSigner()
		window.location.reload()
	}

	const fetchEtherPrice = async () => {
		const res = await (await fetch('/api/v1/tokens?tokenId=ethereum')).json()
		if (!res.success) throw new Error('No token price information')

		setEtherPrice(res.data.ethereum.usd)
	}

	// https://ethereum.org/en/developers/tutorials/send-token-ethersjs/
	const handlePayment = async () => {
		if (!signer || !provider) return
		if (!etherPrice) return

		setLoading(true)

		// get total to pay in ether
		// get gas price 

		const totalInEther = (total / etherPrice).toString()

		const gasPrice = (await provider.getFeeData()).gasPrice

		const tx = await signer.sendTransaction({
			from: signer.address,
			to: address.address,
			value: ethers.parseEther(totalInEther),
			nonce: await provider?.getTransactionCount(signer.address, 'latest'),
			gasLimit: ethers.toBeHex('100000'),
			gasPrice
		})

		const txResponse = await tx.wait()
		assert(txResponse, 'txResult is null for some reason')

		await setSessionPaid(address.chain_id, txResponse.hash, session.id)

		setLoading(false)
	}

	// loading state
	if (loading) return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<LinearProgress />
	</Box>

	if (!signer) return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
		<Button variant="contained" onClick={handleConnectWallet}>Connect EVM wallet</Button>
	</Box>

	return <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
		<Button>Connected as {shortAddress || <CircularProgress sx={{ marginLeft: '8px' }} size='16px' />}</Button>
		<Button variant="contained" onClick={handlePayment}>Pay ${total}</Button>
	</Box>
}
