var gUsers;

const storage = {
    saveUserToStorage(user) {
        sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    },
    loadUserFromStorage() {
        return JSON.parse(sessionStorage.getItem('loggedinUser'))
    }
}

export const utilService = {
    getUserById,
    getAllUsers,
    storage
    
}

function getUserById (id) {
    console.log(gUsers);
}


function getAllUsers () {
    return gUsers
}

