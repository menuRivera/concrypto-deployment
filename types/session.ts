import { Item } from "./item"

export interface Session {
	key_id: number,
	title: string,
	currency: string,
	items: Item[],
	metadata: any,
	urls: {
		success: string,
		failure: string
	}
}
