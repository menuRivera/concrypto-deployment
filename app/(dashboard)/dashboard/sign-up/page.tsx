import { signUpAction } from "@/actions/auth/signup";
import { Button, Card, TextField } from "@mui/material";
import Link from "next/link";

export default function SignUp() {
	return <form action={signUpAction}>
		<Card sx={{
			display: 'flex',
			flexDirection: 'column',
			gap: '15px',
			padding: '20px',
			margin: '20px auto',
			maxWidth: '50%'
		}}>
			<h1>Sign up</h1>
			<TextField required name="email" label="Email" type="email" variant="outlined"></TextField>
			<TextField required name="password" label="Password" type="password" variant="outlined"></TextField>
			<TextField required name="repeat-password" label="Repeat password" type="password" variant="outlined"></TextField>
			<Button type="submit" variant="contained">Sign in</Button>
			<p>Already have an account? <Link style={{ textDecoration: 'underline', color: 'initial' }} href="/dashboard/sign-in">sign in instead</Link></p>
		</Card>
	</form>
}
