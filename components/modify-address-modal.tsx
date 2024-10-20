'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { createAddress } from "@/actions/addresses/create-address"
import { useSearchParams } from "next/navigation"
import { EditSharp } from "@mui/icons-material"
import { Address } from "@/types/addresses"
import { Chain } from "@/types/chains"
import { updateAddress } from "@/actions/addresses/update-address"
import { deleteAddress } from "@/actions/addresses/delete-address"

interface IProps {
	address: Address,
	chain: Chain
}
export default function ModifyAddressModal({ address, chain }: IProps) {
	const params = useSearchParams()

	const [open, setOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const success = params.get('success')
		const error = params.get('error')
		if (success == 'Address updated' || success == 'Chain deleted') {
			setLoading(false)
			setOpen(false)
			window.location.search = ''
		}
		else if (error) {
			setLoading(false)
			window.location.search = ''
		}
	}, [params])

	return <>
		<Button variant="text" onClick={() => setOpen(true)}>
			<EditSharp />
		</Button>
		<Dialog open={open} onClose={() => setOpen(false)} fullWidth >

			<form action={updateAddress} onSubmit={() => setLoading(true)}>
				<DialogTitle>Modify address for <strong>{chain.name}</strong></DialogTitle>

				<DialogContent sx={{ margin: '8px 0' }}>
					<input name="address-id" type="text" hidden value={address.id} />
					<TextField sx={{ margin: '8px 0' }} autoFocus required name="address" label="Address" defaultValue={address.address} fullWidth variant="outlined" />
				</DialogContent>

				<DialogActions sx={{ display: 'flex', margin: '8px', justifyContent: 'space-between' }}>
					<Button color="error" onClick={async () => {
						setLoading(true)
						await deleteAddress(address.id)
					}}>
						Delete chain
					</Button>
					<div>
						<Button sx={{ marginRight: '8px' }} onClick={() => setOpen(false)}>Cancel</Button>
						<Button variant="contained" disabled={loading} type="submit">Update</Button>
					</div>
				</DialogActions>

				{loading && <LinearProgress />}
			</form>

		</Dialog>
	</>
}
