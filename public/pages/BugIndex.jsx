const { useState, useEffect , useRef } = React

import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { utilService } from '../services/util.service.js'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugSort } from '../cmps/BugSort.jsx'


export function BugIndex() {
    const [bugs, setBugs] = useState(null)
    const [filterBy , setFilterBy] = useState(bugService.getDefaultFilter())
    const debounceOnSetFilterBy = useRef(utilService.debounce(setFilterBy,500))
    const [sortBy, setSortBy] = useState(bugService.getSortBy())

    useEffect(() => {
        loadBugs()
    }, [filterBy])

    function loadBugs() {
        bugService.query(filterBy,sortBy).then(setBugs)
    }

    useEffect(() => {
        loadBugs()
    },[sortBy])

    function onRemoveBug(bugId) {
        bugService
            .remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const bugsToUpdate = bugs.filter((bug) => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch((err) => {
                console.log('Error from onRemoveBug ->', err)
                showErrorMsg('Cannot remove bug')
            })
    }

    function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description?'),
        }
        bugService
            .save(bug)
            .then((savedBug) => {
                console.log('Added Bug', savedBug)
                setBugs([...bugs, savedBug])
                showSuccessMsg('Bug added')
            })
            .catch((err) => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
    }

    function onEditBug(bug) {
    const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        bugService
            .save(bugToSave)
            .then((savedBug) => {
                console.log('Updated Bug:', savedBug)
                const bugsToUpdate = bugs.map((currBug) =>
                    currBug._id === savedBug._id ? savedBug : currBug
                )
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug updated')
            })
            .catch((err) => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
            })
    }

    function onChangePage(diff) {
        if (filterBy.pageIdx === undefined) return
        let nextPageIdx = filterBy.pageIdx + diff
        if (nextPageIdx < 0) nextPageIdx = 0
        setFilterBy(prevFilterBy =>({
            ...prevFilterBy, pageIdx: nextPageIdx
        }))
    }

    function onTogglePageination() {
        setFilterBy(prevFilterBy => ({
            ...prevFilterBy, 
            pageIdx: filterBy.pageIdx === undefined ? 0 : undefined
        }))
    }

    return (
        <main>
            <h3>Bugs App</h3>
            <section className="pagination">
                <button onClick={() => onChangePage(-1)}>Prev</button>
                <span className='page-idx'>{filterBy.pageIdx + 1 || 'No pagination'}</span>
                <button onClick={() => onChangePage(1)}>Next</button>
                <button onClick={() => onTogglePageination()}>Toggle Pagination</button>
            </section>

            <BugFilter setFilterBy={debounceOnSetFilterBy.current} filterBy={filterBy}/>
            <BugSort sortBy={sortBy} setSortBy={setSortBy} />
            <main>
                <button onClick={onAddBug}>Add Bug ⛐</button>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </main>
    )
}
