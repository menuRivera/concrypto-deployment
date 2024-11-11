import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	try {
		const tokenId = searchParams.getAll('tokenId')
		if (!tokenId) throw { message: 'No tokenName provided', status: 400 }

		// make the fetch call to coingecko
		const res = await (await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${tokenId}`)).json()

		return NextResponse.json({ success: true, data: res })
	} catch (e) {
		console.error(e)
		return NextResponse.json({ success: false, message: (e as any).message || e }, { status: (e as any).status || 500 })
	}
}
