import { signInAction } from "@/actions/auth/signin";
import { Button, Card, TextField } from "@mui/material";
import Link from "next/link";

export default function SignIn() {
	return <form action={signInAction}>
		<Card sx={{
			display: 'flex',
			flexDirection: 'column',
			gap: '15px',
			padding: '20px',
			margin: '20px auto',
			maxWidth: '50%'
		}}>
			<h1>Sign in</h1>
			<TextField required name="email" label="Email" type="email" variant="outlined"></TextField>
			<TextField required name="password" label="Password" type="password" variant="outlined"></TextField>
			<Button type="submit" variant="contained">Sign in</Button>
			<p>Create a new account <Link style={{ textDecoration: 'underline', color: 'initial' }} href="/dashboard/sign-up">here</Link></p>
		</Card>
	</form>
}
