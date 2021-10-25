

module.exports.cookieTest = {
    url: 'http://localhost:4000/api/refreshtoken',
    options: {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
    }
}

module.exports.securityTest = {
    url: 'http://localhost:4000/api/security',
    options: {
        mode: 'cors',
        method: 'GET'
        
    }
}

module.exports.errorTest = {
    url: 'http://localhost:4000/api/errortest/custom',
    options: {
        mode: 'cors',
        method: 'GET'

    }
}