import { useEffect } from 'react'

export const useTest = (title) => {


    useEffect(() => {
        console.log('use effect test', title);
    })

}