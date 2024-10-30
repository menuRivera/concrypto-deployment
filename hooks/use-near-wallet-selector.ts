'use client'

import { useEffect, useState } from "react"
import { setupWalletSelector, Wallet, WalletSelector } from '@near-wallet-selector/core'
import { setupModal, WalletSelectorModal } from "@near-wallet-selector/modal-ui"
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet"
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet"

export const useNearWalletSelector = (network: 'testnet' | 'mainnet') => {
	const [loading, setLoading] = useState<boolean>(true)

	const [selector, setSelector] = useState<WalletSelector | null>(null)
	const [modal, setModal] = useState<WalletSelectorModal | null>(null)
	const [wallet, setWallet] = useState<Wallet | null>(null)
	const [account, setAccount] = useState<string | null>()

	useEffect(() => {
		setupSelector()
	}, [])

	const setupSelector = async () => {
		const _selector = await setupWalletSelector({
			network,
			modules: [
				setupMyNearWallet(),
				setupMeteorWallet()
			]
		})

		_selector.on('signedOut', () => {
			setAccount(null)
			setWallet(null)
		})

		const _modal = setupModal(_selector, { contractId: '' })

		setSelector(_selector)
		setModal(_modal)

		if (_selector.isSignedIn()) {
			const _wallet = await _selector.wallet()
			setWallet(_wallet)

			const accounts = await _wallet.getAccounts()
			setAccount(accounts[0].accountId)
		}

		setLoading(false)
	}

	return {
		loading,
		selector,
		modal,
		wallet,
		account
	}
}
