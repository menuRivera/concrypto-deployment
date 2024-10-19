'use client'

import { toggleAddress } from "@/actions/addresses/toggle-address"
import { Switch, SwitchProps } from "@mui/material"

interface IProps extends SwitchProps {
	addressId: number
}

export default function AddressSwitch({ addressId, ...props }: IProps) {
	return <Switch {...props} onChange={async (e) => {
		await toggleAddress(addressId, e.target.checked)
	}} />
}
