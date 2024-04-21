"use client";

const setLocalStorageData = (dataType,data) =>{
    
    if(dataType === 'user'){
        const userString = JSON.stringify(data)
        localStorage.setItem('user',userString)
        return
    }
    if(dataType === 'news'){
        const newsString = JSON.stringify(data)
        localStorage.setItem('news',newsString)
        return
    }

}

export default setLocalStorageData;