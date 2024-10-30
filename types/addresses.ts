import { Chain } from "./chains"

export interface Address {
	id: number,
	key_id: number,
	chain_id: number,
	address: string,
	active: boolean
}

export interface AddressWithChain extends Address {
	chain: Chain
}
