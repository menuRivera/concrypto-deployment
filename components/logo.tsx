import Link from "next/link";

interface IProps {
	to?: string
}
export default function Logo({ to }: IProps) {

	return <div id="logo">
		<Link href={to || '/'}>ConCrypto.</Link>
	</div>

}
