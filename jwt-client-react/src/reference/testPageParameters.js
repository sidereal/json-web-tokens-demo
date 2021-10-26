import { refreshtokens, errorDemo, tokenSecurityDemo, roleSecurityDemo } from './endpoints'



export const refreshTest = {
    url: refreshtokens,
    options: {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
    }
}

export const tokenBasedSecurityTest = {
    url: tokenSecurityDemo,
    options: {
        mode: 'cors',
        method: 'GET'

    }
}

export const roleBasedSecurityTest = {
    url: roleSecurityDemo,
    options: {
        mode: 'cors',
        method: 'GET'

    }
}


export const errorTest = {
    url: errorDemo,
    options: {
        mode: 'cors',
        method: 'GET'

    }
}