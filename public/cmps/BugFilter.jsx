const { useState, useEffect } = React


export function BugFilter({ setFilterBy, filterBy }) {

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToUpdate)
    }, [filterByToUpdate])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilterByToUpdate((prevFilterByToUpdate) => ({ ...prevFilterByToUpdate, [field]: value }))
    }
    console.log(filterBy);
    function onSubmit(ev) {
        ev.preventDefault()
    }

    function onChangeSelect({target}) {
        let { value } = target
        setFilterByToUpdate(() => ({...filterByToUpdate, label: value}))
    }

    return <section className="bug-filter">
        <h2>Filter our bugs</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="filter-title">Title</label>
            <input type="text"
                id="filter-title"
                name="title"
                value={filterByToUpdate.title}
                onChange={handleChange}
                placeholder="By title"
            />
            <label htmlFor="filter-desc">Description</label>
            <input type="text"
                id="filter-desc"
                name="desc"
                value={filterByToUpdate.desc}
                onChange={handleChange}
                placeholder="By Description"
            />
            <label htmlFor="filter-min-severity">Min Severity</label>
            <input type="number"
                id="filter-min-severity"
                name="minSeverity"
                value={filterByToUpdate.minSeverity}
                onChange={handleChange}
                placeholder="By min severity"
            />
            <select onChange={(ev) => onChangeSelect(ev)} name="filter-labels" id="filter-labels">
                <option value="">Select</option>
                <option value="critical">Critical</option>
                <option value="dev-branch">Dev Branch</option>
                <option value="urgent">Urgent</option>
                <option value="need-CR">Need CR</option>
            </select>

        </form>
    </section>
}