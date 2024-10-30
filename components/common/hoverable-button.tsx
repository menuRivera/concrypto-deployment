import { Button, ButtonProps } from "@mui/material";
import { useMemo, useState } from "react";

interface HoverableButtonProps extends ButtonProps {
	beforeHoverLabel: string,
	afterHoverLabel: string,
	beforeHoverColor: string,
	afterHoverColor: string
}

export default function HoverableButton({
	beforeHoverLabel,
	afterHoverLabel,
	beforeHoverColor,
	afterHoverColor,
	...props
}: HoverableButtonProps) {
	const [hovered, setHovered] = useState<boolean>(false)

	return <Button
		onMouseEnter={() => setHovered(true)}
		onMouseLeave={() => setHovered(false)}
		// @ts-ignore
		color={hovered ? afterHoverColor : beforeHoverColor}
		{...props}
	>
		{hovered ? afterHoverLabel : beforeHoverLabel}
	</Button>
}
