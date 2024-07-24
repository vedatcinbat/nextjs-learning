import { getAllNews } from "@/app/lib/news";
import NewsList from "@/components/news-list";

export default async function NewsPage() {
    const news = await getAllNews();

    return (
        <>
            <h2>News Page</h2>
            <NewsList news={news} />
        </>
    )
}