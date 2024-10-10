export default function SessionUI({ params }: { params: { sessionId: string } }) {
	return <>
		<h1>Payment UI</h1>
		<pre>{params.sessionId}</pre>
	</>
}
