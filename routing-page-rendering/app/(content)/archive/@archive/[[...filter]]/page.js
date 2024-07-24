import { Suspense } from "react";

import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/app/lib/news";
import NewsList from "@/components/news-list";
import Link from "next/link";

async function FilterHeader({ year, month }) {
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;

    if (year && !month) {
        links = getAvailableNewsMonths(year);
    }

    if (year && month) {
        links = [];
    }

    return (
        <header id="archive-header">
                    <nav>
                        <ul>
                            {links.map((link) => {
                                const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
                                return (
                                    <li key={link}>
                                        <Link href={href}>{link}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </header>
    )

}

async function FilteredNews({ year, month }) {
    let news;
    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }

    let newsContent = <p>Not news found for the selected period</p>

    if (news) {
        newsContent = <NewsList news={news} />
    }

    return newsContent;
}



export default async function FilteredNewsPage({ params }) {
    const filter = params.filter;

    const selectedYear = filter ? filter[0] : undefined;
    const selectedMonth = filter ? filter[1] : undefined;

    return (
        <>
            <Suspense fallback={<p>Loading filter...</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
            </Suspense>
            <Suspense fallback={<p>Loading News...</p>}>
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    )
}