import { Item as IItem } from "@/types/item";
import { Box, Card, Typography } from "@mui/material";

interface IProps {
	item: IItem
}

export default function Item({ item }: IProps) {
	const amount = item.unit_price * item.quantity

	return <Card sx={{ display: 'flex', margin: '8px' }}>
		<img style={{ width: '150px', marginRight: '8px' }} src={item.media} alt={`${item.name} media`} />

		<Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '8px', justifyContent: 'space-between' }}>
			<Box>
				<Typography variant="h5">{item.name}</Typography>
				<Typography>{item.description}</Typography>
			</Box>
			<p style={{ alignSelf: 'end', fontWeight: 'lighter' }}>{item.quantity} x ${item.unit_price}</p>
			<p style={{ alignSelf: 'end', fontWeight: 'bold' }}>${amount}</p>
		</Box>
	</Card>
}
