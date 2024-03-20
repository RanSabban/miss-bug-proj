import fs from 'fs'


import { utilService } from './utils.service.js'

const PAGE_SIZE = 4

// const STORAGE_KEY = 'bugDB'

// _createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
}


const bugs = utilService.readJsonFile('data/bug.json')




function query(filterBy,sortBy) {
    let bugsToReturn = bugs
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.title))
    }

    if (filterBy.minSeverity) {
        bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.minSeverity)
    }
    if (filterBy.desc) {
        const regex = new RegExp(filterBy.desc, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.description))
    }
    if (sortBy.title) {
        bugsToReturn = bugsToReturn.sort((bugA,bugB) => bugA.title.localeCompare(bugB.title) * sortBy.title)
    }

    if (sortBy.description) {
        bugsToReturn = bugsToReturn.sort((bugA,bugB) => bugA.description.localeCompare(bugB.description) * sortBy.description)
    }

    if (sortBy.severity) {
        bugsToReturn = bugsToReturn.sort((bugA,bugB) => (bugA.severity - bugB.severity) * sortBy.severity)
    }
    if (filterBy.pageIdx !== undefined) {
        const pageIdx = +filterBy.pageIdx
        const startIdx = pageIdx * PAGE_SIZE
        bugsToReturn = bugsToReturn.slice(startIdx, startIdx + PAGE_SIZE)
    }
    if (filterBy.label) {
        bugsToReturn = bugsToReturn.filter(bug => bug.labels.includes(filterBy.label))
    }
    return Promise.resolve(bugsToReturn)
}

function sortBugs(bugs,sortBy){
    if (sortBy.title) {
        bugs = bugs.sort((bugA,bugB) => bugA.title.localeCompare(bugB.title) * sortBy.title)
    }

    if (sortBy.description) {
        bugs = bugs.sort((bugA,bugB) => bugA.description.localeCompare(bugB.description) * sortBy.description)
    }

    if (sortBy.severity) {
        bugs = bugs.sort((bugA,bugB) => (bugA.severity - bugB.severity) * sortBy.severity)
    }
    return bugs
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Bug does not exist')
    return Promise.resolve(bug)
}

function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function save(bug) {
    if (bug._id) {
        const bugIdx = bugs.findIndex(_bug => _bug._id === bug._id)
        bugs[bugIdx] = bug
    } else {
        bug._id = utilService.makeId()
        bug.createdAt = Date.now()
        bugs.unshift(bug)
    }
    return _saveBugsToFile().then(() => bug)
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            resolve()
        })
    })
}






