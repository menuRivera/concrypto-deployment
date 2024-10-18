'use server'

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";

export const signUpAction = async (formData: FormData) => {
	const origin = headers().get("origin");
	const supabase = createClient();

	const email = formData.get("email")?.toString()!;
	const password = formData.get("password")?.toString()!;

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/dashboard`,
		},
	});

	if (error) {
		console.error(error.code + " " + error.message);
		return encodedRedirect("error", "/sign-up", error.message);
	} else {
		return encodedRedirect(
			"success",
			"/sign-up",
			"Thanks for signing up! Please check your email for a verification link.",
		);
	}
};
