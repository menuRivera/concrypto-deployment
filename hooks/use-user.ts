'use server';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const useUser = async () => {
	const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser();

	if (!user) {
		return redirect("/dashboard/sign-in");
	}

	return user
}
