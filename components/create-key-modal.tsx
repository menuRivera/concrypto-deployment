'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react"
import { createKey } from "@/actions/api-keys/create-key"

export default function CreateKeyModal() {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)


	return <>
		<Button variant="contained" onClick={() => setOpen(true)} startIcon={<AddIcon />}>Create new</Button>
		<Dialog open={open} onClose={() => setOpen(false)} fullWidth >

			<form action={createKey} onSubmit={() => setLoading(true)}>
				<DialogTitle>Create a new api key</DialogTitle>

				<DialogContent>
					<TextField sx={{ margin: '16px 0' }} autoFocus required name="label" label="Label for your new api key" fullWidth variant="outlined" />
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button variant="contained" disabled={loading} type="submit">Create</Button>
				</DialogActions>

				{loading && <LinearProgress />}
			</form>

		</Dialog>
	</>
}
