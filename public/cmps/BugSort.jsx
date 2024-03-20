export function BugSort({ setSortBy, sortBy }) {

    // const [sortedBy,onSetSortedBy] = useState(sortBy)

    function setSort(field) {
        console.log(field);
        if (field === 'title') {
            sortBy.title === 1 ? setSortBy({ title: -1 }) : setSortBy({ title: 1 })
        }

        if (field === 'description') {
            sortBy.description === 1 ? setSortBy({ description: -1 }) : setSortBy({ description: 1 })
        }

        if (field === 'severity') {
            sortBy.severity === 1 ? setSortBy({ severity: -1 }) : setSortBy({ severity: 1 })
        }
    }

    return <section className="bug-sort">
        <button className="sort-btn" onClick={() => setSort('title')}>Title</button>
        <button className="sort-btn" onClick={() => setSort('description')}>Description</button>
        <button className="sort-btn" onClick={() => setSort('severity')}>Severity</button>
    </section>
}