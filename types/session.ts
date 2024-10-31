import { Item } from "./item"

export interface Session {
	id: number,
	key_id: number,
	title: string,
	currency: string,
	paid: boolean,
	session_type: 'production' | 'development',
	items: Item[],
	metadata: any,
	urls: {
		success: string,
		failure: string
	}
}
