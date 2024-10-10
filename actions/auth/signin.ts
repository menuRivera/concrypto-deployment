'use server'

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
	const supabase = createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message);
	}

	return redirect("/dashboard");
};
