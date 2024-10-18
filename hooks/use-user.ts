'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { User } from '@supabase/supabase-js'

export const useUser = () => {
	const supabase = createClient()

	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		getUser()
	}, [])

	const getUser = async () => {
		const { data: { user } } = await supabase.auth.getUser()
		if (user) setUser(user)
	}

	return user
}
