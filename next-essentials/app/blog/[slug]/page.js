export default function BlogPostPage({params}) {
    const { slug } = params;
    return (
        <main>
            <h1>Blog Post Page - {slug}</h1>
            <p>This is a blog post</p>
        </main>
    )
}