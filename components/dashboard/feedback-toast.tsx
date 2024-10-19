'use client'

import { Alert, Snackbar } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function FeedbackToast() {
	const params = useSearchParams()

	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	useEffect(() => {
		const _error = params.get('error')
		const _success = params.get('success')
		if (_error) setError(_error)
		else if (_success) setSuccess(_success)
	}, [params])

	if (error) return <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
		<Alert onClose={() => setError(null)} severity="error" variant="filled" sx={{ width: '100%' }}>{error}</Alert>
	</Snackbar>
	else if (success) return <Snackbar open={!!success} autoHideDuration={5000} onClose={() => setSuccess(null)}>
		<Alert onClose={() => setSuccess(null)} severity="success" variant="filled" sx={{ width: '100%' }}>{success}</Alert>
	</Snackbar>
}
