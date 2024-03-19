
import { storageService } from './async-storage.service.js'
import {utilService} from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

// _createBugs()

export const bugService = {
    query,
    getById,
    remove,
    save
}


function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)  
        .catch(err => {
            console.log('err:',err);
        })
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove').then(res => res.data)
}

function save(bug) {
    console.log(bug);
    const url = BASE_URL + 'save'
    let queryParams = `?title=${bug.title}&severity=${bug.severity}`
    if (bug._id) {
        queryParams += `&description=${bug.description}&_id=${bug._id}`
    }
    return axios.get(url + queryParams).then(res => res.data)
    // return axios.save(BASE_URL + bugId + '/save').then(res => res.data)
}

function _saveBugsToFile(){
  
}






