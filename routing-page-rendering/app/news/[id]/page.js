import Link from "next/link"

export default function OneNewsPage({params}) {
    //const {id} = params;
    const id = params.id;
    return (
        <>
            <h2>One News Page</h2>
            <p>News: {id}</p>
            <Link href="/news">News Homepage</Link>
        </>
    )
}