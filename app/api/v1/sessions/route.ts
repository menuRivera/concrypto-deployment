import { ApiKey } from "@/types/api-key";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
	key_id: z.number(),
	title: z.string(),
	// amount: z.number(), //total amount will be calculated based on items.unitPrice and currency fields
	currency: z.string(),
	items: z.array(z.object({
		name: z.string(),
		description: z.string().optional(),
		media: z.string().optional(),
		unit_price: z.number(),
	})),
	metadata: z.any().optional(),
	urls: z.object({
		success: z.string(),
		failure: z.string().optional()
	})
})

/**
	* Create a new session and return the id and the session url 
*/
export async function POST(request: NextRequest) {
	const supabase = createClient()
	try {
		const key = headers().get('x-auth-token') as string

		if (!key) throw { status: 401, message: 'No API key found' }

		const { data: apiKey } = await supabase
			.from('api-keys')
			.select()
			.eq('key', key)
			.single<ApiKey>()

		if (!apiKey) throw { status: 401, message: 'Invalid API key' }

		const body = await request.json() as z.infer<typeof bodySchema>
		const { error: validationError } = bodySchema.safeParse(body)

		if (validationError) throw { status: 400, message: `${validationError.message}\n${validationError.cause}` }

		const slug = nanoid()
		const { data, error } = await supabase
			.from('sessions')
			.insert({ slug, ...body })
			.select()
			.single()

		if (error) throw error

		return NextResponse.json({
			success: true,
			data: {
				id: data.id,
				session_url: `http://localhost:3000/payment/${data.slug}`
			}
		})
	} catch (e) {
		console.error(e)
		return NextResponse.json({ success: false, message: (e as any).message || e }, { status: (e as any).status || 500 })
	}
}
