import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/app/lib/news";
import NewsList from "@/components/news-list";
import Link from "next/link";

export default function FilteredNewsPage({ params }) {
    const filter = params.filter;
    console.log(filter);
    let links = getAvailableNewsYears();

    const selectedYear = filter ? filter[0] : undefined;
    const selectedMonth = filter ? filter[1] : undefined;

    let news;

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear);
    }

    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }

    let newsContent = <p>Not news found for the selected period</p>

    if (news) {
        newsContent = <NewsList news={news} />
    }

    /* const filteredNews = getNewsForYear(newsYear);
    return <NewsList news={filteredNews} /> */

    if (selectedYear && !getAvailableNewsYears().includes(+selectedYear)
        ||
        (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth)
        )) {
        throw new Error('Invalid filter')
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map((link) => {
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
                            return (
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    )
}