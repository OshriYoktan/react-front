import { httpService } from './httpService.js'

const KEY = 'todo/'

export const fruitService = {
    query,
    remove,
    save,

}

function query(filter = null) {
    var query = '?'
    if (filter) query += 'q=' + filter + '&'
    return httpService.get(KEY + query, filter)
}

function remove(id) {
    return httpService.delete(KEY + id)
}

function save(fruit) {
    if (fruit._id) {
        return httpService.put(KEY + fruit._id, fruit)
    }
    else return httpService.post(KEY, fruit)
}