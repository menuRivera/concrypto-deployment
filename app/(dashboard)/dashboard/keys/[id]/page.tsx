interface IProps {
	params: {
		id: string
	}
}
export default function ManageKeyPage({ params }: IProps) {
	return <h1>manage key {params.id}</h1>
}
