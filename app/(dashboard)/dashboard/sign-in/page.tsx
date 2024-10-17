import { signInAction } from "@/actions/auth/signin";
import { Button, TextField } from "@mui/material";

export default function SignIn() {
	return <form action={signInAction}>
		<TextField label="Email" variant="outlined"></TextField>
		<TextField label="Password" variant="outlined"></TextField>
		<Button type="submit">Sign in</Button>
	</form>
}
