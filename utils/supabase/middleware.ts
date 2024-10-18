import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
	* Exctracted right from the supabase + nextjs template 
*/
export const updateSession = async (request: NextRequest) => {
	// Create an unmodified response
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// This will refresh session if expired - required for Server Components
	// https://supabase.com/docs/guides/auth/server-side/nextjs
	const user = await supabase.auth.getUser();


	// protected routes
	if (
		user.error
		&& request.nextUrl.pathname.startsWith("/dashboard")
		&& !request.nextUrl.pathname.includes('sign')
	) {
		return NextResponse.redirect(new URL("/dashboard/sign-up", request.url));
	}
	if (
		!user.error
		&& request.nextUrl.pathname.startsWith('/dashboard/sign')
	) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return response;
};

