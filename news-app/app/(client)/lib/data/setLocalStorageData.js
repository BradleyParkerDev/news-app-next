"use client";

const setLocalStorageData = (dataType,data) =>{
    
    if(dataType === 'user'){
        const userString = JSON.stringify(data)
        localStorage.setItem('user',userString)
        return
    }
    if(dataType !== 'user' && data.articles !== null){
        const newsString = JSON.stringify(data)
        localStorage.setItem(`${dataType}`,newsString)
        return
    }

}

export default setLocalStorageData;