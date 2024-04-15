const setLocalStorageData = (dataType,data) =>{
    
    if(dataType === 'user'){
        const userString = JSON.stringify(data)
        localStorage.setItem('user',userString)
        return
    }
    if(dataType === 'preferences'){
        const preferencesString = JSON.stringify(data)
        localStorage.setItem('preferences',preferencesString)
        return
    }

}

export default setLocalStorageData;