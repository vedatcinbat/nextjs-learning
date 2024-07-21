import Link from "next/link";

export default function BlogPage() {
    return (
        <main className="text-center">
            <h1>Blog Page</h1>
            <p>This is the blog page</p>
            <Link href="/blog/post-1">Post 1</Link>
            <Link href="/blog/post-2">Post 2</Link>
            <Link href="/blog/something">Post Something</Link>
        </main>
    );
}