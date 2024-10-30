type SDKs = 'evm' | 'solana' | 'near' | 'custom' | 'icp'

export interface Chain {
	id: number,
	name: string,
	type: 'mainnet' | 'testnet',
	chain_id: number | null,
	rpc: string,
	explorer_url: string,
	sdk: SDKs
}
