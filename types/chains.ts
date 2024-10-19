export interface Chain {
	id: number,
	name: string,
	type: 'mainnet' | 'testnet',
	rpc: string,
	explorer_url: string
}
