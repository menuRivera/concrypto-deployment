'use client'

import HoverableButton from "@/components/common/hoverable-button";
import { useNearWalletSelector } from "@/hooks/use-near-wallet-selector";
import { AddressWithChain } from "@/types/addresses";
import { utils } from 'near-api-js'
import { Box, Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMainnetRpcProvider, getTestnetRpcProvider } from "@near-js/client";
import { Session } from "@/types/session";
import { setSessionPaid } from "@/actions/sessions/set-session-paid";

interface IProps {
	total: number,
	address: AddressWithChain,
	session: Session
}
export default function Near({ address, total, session }: IProps) {
	const searchParams = useSearchParams()
	const { modal, loading: selectorLoading, account, wallet } = useNearWalletSelector(address.chain)
	const [totalInYocto, setTotalInYocto] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!totalInYocto) fetchNearPrice()
		else checkTxResult()
	}, [account, totalInYocto])

	const checkTxResult = async () => {
		if (!account) return
		if (!totalInYocto) return

		// check the url for tx result
		// url.com/slug?transactionHashes=H2K2bfGagdP4Kt3cSiRf53FvM6A16otQLGy6nrGHeGtk
		const transactionHash = searchParams.get('transactionHashes')
		if (!transactionHash) return setLoading(false)

		const rpcProvider = address.chain.type === 'mainnet'
			? getMainnetRpcProvider()
			: getTestnetRpcProvider()

		const result = await rpcProvider.getTransaction({
			account: account,
			transactionHash
		})

		const transferred = result.transaction.actions[0].Transfer.deposit as string

		const transferredNear = utils.format.formatNearAmount(transferred)
		const totalInNear = utils.format.formatNearAmount(totalInYocto)

		const diff = Math.abs(Number(transferredNear) - Number(totalInNear))
		const equal = diff < 0.05

		if (equal) {
			// success!
			// mark session as successfully paid
			// redirect user to the success page
			console.log('Payment successful...')
			await setSessionPaid(address.chain_id, transactionHash, session.id)
		}

		setLoading(false)
	}

	const fetchNearPrice = async () => {
		const nearToken = await (await fetch(`https://indexer.ref.finance/get-token-price?token_id=wrap.near`)).json()
		const yoctoAmount = utils.format.parseNearAmount((total / parseFloat(nearToken.price)).toString())
		if (!yoctoAmount) throw new Error('Idk, no yoctoAmount')
		setTotalInYocto(yoctoAmount)
	}

	const handlePayment = async () => {
		if (!wallet) return
		if (!totalInYocto) return

		try {
			await wallet.signAndSendTransaction({
				receiverId: address.address,
				actions: [
					{
						type: 'Transfer',
						params: {
							deposit: totalInYocto
						}
					}
				]
			})

			alert('Successfully sent money!')
		} catch (e) {
			console.error(e)
		}
	}

	// loading state
	if (selectorLoading || loading) return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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

		<Button variant="contained" onClick={handlePayment}>Pay ${total}</Button>
	</Box >
}
