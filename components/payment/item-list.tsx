import { Session } from "@/types/session";
import Item from "./item";
import { Box, Typography } from "@mui/material";

interface IProps {
	session: Session
}

export default function ItemList({ session }: IProps) {
	const total: number = session.items.reduce((prev, curr, _index) => (curr.unit_price * curr.quantity) + prev, 0)

	return <Box>
		<Typography variant="h4">Items</Typography>

		{session.items.map((item, i) => (
			<Item key={i} item={item} />
		))}

		<Typography variant="h5" sx={{ textAlign: 'end', margin: '8px' }}>Total: <strong>${total}</strong></Typography>
	</Box>
}
