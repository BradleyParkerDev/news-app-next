"use client";

const getLocalStorageData = (dataType) =>{
    if(dataType==='user'){
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        // console.log(userData); 
        return userData
    }

    if(dataType!=='user'){
        const news = localStorage.getItem(`${dataType}`);
        const newsData = JSON.parse(news);
        console.log(newsData); 
        return newsData
    }


}

export default getLocalStorageData;