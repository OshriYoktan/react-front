import { httpService } from './httpService.js'

const KEY = 'toy/'

export const toyService = {
    query,
    remove,
    save,

}

function query(filter = null) {
    var query = '?'
    if (filter) query += 'q=' + filter + '&'
    // if (filter.sortBy) query += 's=' + filter.sortBy + '&'
    // if (filter.stockFilter) query += 'f=' + filter.stockFilter + '&'
    return httpService.get(KEY + query, filter)
}

function remove(id) {
    return httpService.delete(KEY + id)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(KEY + toy._id, toy)
    }
    else return httpService.post(KEY, toy)
}