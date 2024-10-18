import { signOutAction } from "@/actions/auth/signout";
import { Button } from "@mui/material";

export default async function Profile() {
	return <div>
		<h1 style={{ marginBottom: '24px' }}>Profile</h1>
		<form action={signOutAction}>
			<Button variant="contained" color="error" type="submit">Log out</Button>
		</form>
	</div>
}
