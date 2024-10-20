export interface Session {
	key_id: number,
	title: string,
	currency: string,
	items: {
		name: string,
		description: string,
		media: string,
		unit_price: number,
	}[],
	metadata: any,
	urls: {
		success: string,
		failure: string
	}
}
