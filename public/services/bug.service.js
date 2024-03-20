
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

// _createBugs()

export const bugService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getSortBy
}


function query(filterBy = getDefaultFilter(), sortBy = getSortBy()) {
    // console.log(filterBy);
    // console.log(sortBy);
    // const filterAndSort = {...filterBy,...sortBy}
    // console.log(filterAndSort);
    filterBy.sortBy = sortBy
    return axios.get(BASE_URL, { params: filterBy})
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err);
        })
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId).then(res => res.data)
}

function save(bug) {
    if (bug._id) {
        return axios.put(BASE_URL, bug)
    } else {
        return axios.post(BASE_URL, bug)
    }
}

function getDefaultFilter() {
    return { title: '', minSeverity: 0, desc: '' }
}

function getSortBy() {
    return { title: 1 }
}

function _saveBugsToFile() {

}






