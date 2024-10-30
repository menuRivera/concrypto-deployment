'use client'

import { Chain } from '@/types/chains'
import { ethers, JsonRpcSigner } from 'ethers'
import { BrowserProvider } from 'ethers'
import { useEffect, useMemo, useState } from 'react'

declare global {
	interface Window {
		ethereum: any
	}
}

export const useEvmWallet = (chain: Chain) => {
	const [provider, setProvider] = useState<BrowserProvider | null>(null)
	const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
	const [address, setAddress] = useState<string | null>(null)

	useEffect(() => {
		setupWallet()
	}, [])

	const setupWallet = async () => {
		if (!window.ethereum) return //prolly throw some error idk

		// get a provider
		const _provider = new BrowserProvider(window.ethereum)

		// change network flow(?)
		const network = await _provider.getNetwork()
		if (network.chainId != BigInt(chain.chain_id!)) {
			// request network change
			try {
				await _provider.send('wallet_switchEthereumChain', [{ chainId: ethers.toBeHex(chain.chain_id!) }])
			} catch (e) {
				const error = e as any

				switch (error.code) {
					case '4001':
						console.error("the user doesn't want to change the network!")
						break;
					case 4902:
						console.error("this network is not in the user's wallet")
						break;
					default:
						// restart function execution
						// return setupWallet()
						console.error(error)
				}
			}
		}

		const acc = await _provider.listAccounts()
		if (acc.length > 0) {
			const _signer = await _provider.getSigner()
			const _address = await _signer.getAddress()

			setSigner(_signer)
			setAddress(_address)
		}

		setProvider(_provider)
	}

	const shortAddress = useMemo<string | null>(() => {
		if (!address) return null

		return `${address.slice(0, 6)}...${address.slice(address.length - 6, address.length)}`
	}, [address])

	return {
		provider,
		signer,
		address,
		shortAddress
	}
}
