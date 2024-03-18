
import { storageService } from './async-storage.service.js'
import {utilService} from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

// _createBugs()

export const bugService = {
    query,
    get,
    remove,

}


function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function get(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)  
        .catch(err => {
            console.log('err:',err);
        })
}

function remove(bugId) {

}

function save(bug) {

}

function _saveBugsToFile(){
  
}






