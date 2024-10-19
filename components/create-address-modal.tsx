'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, MenuItem, Select, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useState } from "react"
import { createAddress } from "@/actions/addresses/create-address"
import { Chain } from "@/types/chains"
import { ApiKey } from "@/types/api-key"
import { useSearchParams } from "next/navigation"

interface IProps {
	chains: Chain[],
	apiKey: ApiKey
}
export default function CreateAddressModal({ chains, apiKey }: IProps) {
	const params = useSearchParams()

	const [open, setOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (params.get('success') == 'Address added') {
			setLoading(false)
			setOpen(false)
			window.location.search = ''
		}
	}, [params])

	return <>
		<Button variant="contained" onClick={() => setOpen(true)} endIcon={<AddIcon />}>Add a new chain</Button>
		<Dialog open={open} onClose={() => setOpen(false)} fullWidth >

			<form action={createAddress} onSubmit={() => setLoading(true)}>
				<DialogTitle>Add a new chain</DialogTitle>

				<DialogContent sx={{ margin: '16px 0' }}>
					<input name="key-id" type="text" value={apiKey.id} hidden />

					<Select fullWidth defaultValue={chains[0].id} name="chain-id" required sx={{ marginBottom: '8px' }}>
						{chains.map((c, i) => (
							<MenuItem key={i} value={c.id}>{c.name}</MenuItem>
						))}
					</Select>

					<TextField autoFocus required name="address" label="Address" fullWidth variant="outlined" />
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button variant="contained" disabled={loading} type="submit">Add</Button>
				</DialogActions>

				{loading && <LinearProgress />}
			</form>

		</Dialog>
	</>
}
