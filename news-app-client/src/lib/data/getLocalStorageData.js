const getLocalStorageData = (dataType) =>{
    if(dataType==='user'){
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        // console.log(userData); 
        return userData
    }

    if(dataType==='preferences'){
        const preferences = localStorage.getItem('preferences');
        const preferencesData = JSON.parse(preferences);
        console.log(preferencesData); 
        return preferencesData
    }


}

export default getLocalStorageData;