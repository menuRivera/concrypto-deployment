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

// from https://eips.ethereum.org/EIPS/eip-3085#wallet_addethereumchain
interface AddEthereumChainParameter {
	chainId: string;
	blockExplorerUrls?: string[];
	chainName?: string;
	iconUrls?: string[];
	nativeCurrency?: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls?: string[];
}

const forceNetworkChange = async (provider: BrowserProvider, chain: Chain) => {
	const network = await provider.getNetwork()
	if (network.chainId == BigInt(chain.chain_id!)) return

	// request network change
	let networkChanged = false
	do {
		try {
			await provider.send('wallet_switchEthereumChain', [{ chainId: ethers.toBeHex(chain.chain_id!) }])
			networkChanged = true
		} catch (e) {
			const error = e as any

			switch (error.info.error.code) {
				case 4001:
					// alert("the user doesn't want to change the network!")
					alert('Please accept the network change in order to proceed')
					break;
				case 4902:
					// the user doesn't have the network
					await addNewNetwork(provider, chain)
					break;
				default:
					console.error(error)
					throw error;
			}
		}

	} while (!networkChanged)
}

const addNewNetwork = async (provider: BrowserProvider, chain: Chain) => {
	try {
		const newChain: AddEthereumChainParameter = {
			chainId: ethers.toBeHex(chain.chain_id!),
			rpcUrls: [chain.rpc],
			chainName: chain.name,
			nativeCurrency: chain.native_currency,
			blockExplorerUrls: [chain.explorer_url]
		}

		await provider.send("wallet_addEthereumChain", [newChain]);
	} catch (e) {
		const error = e as any
		console.error(error)
		console.log({ error })
	}

}

export const useEvmWallet = (chain: Chain) => {
	const [loading, setLoading] = useState<boolean>(true)
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

		forceNetworkChange(_provider, chain)

		const acc = await _provider.listAccounts()
		if (acc.length > 0) {
			const _signer = await _provider.getSigner()
			const _address = await _signer.getAddress()

			setSigner(_signer)
			setAddress(_address)
		}

		setProvider(_provider)
		setLoading(false)
	}

	const shortAddress = useMemo<string | null>(() => {
		if (!address) return null

		return `${address.slice(0, 6)}...${address.slice(address.length - 6, address.length)}`
	}, [address])

	return {
		provider,
		signer,
		address,
		shortAddress,
		walletLoading: loading
	}
}
