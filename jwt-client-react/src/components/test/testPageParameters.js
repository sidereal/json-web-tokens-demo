import {api} from '../../modules/constants'



export const cookieTest = {
    url: `${api}/refreshtokens`,
    options: {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
    }
}

export const securityTest = {
    url: 'http://localhost:4000/api/security',
    options: {
        mode: 'cors',
        method: 'GET'
        
    }
}

export const errorTest = {
    url: `${api}/demo/error`,
    options: {
        mode: 'cors',
        method: 'GET'

    }
}