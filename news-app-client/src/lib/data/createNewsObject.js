const createNewsObject = () =>{

    const searchPreferences = {
        endpoint: 'top-headlines',
        category:'',
        country:'us'
    
    }
    const newsObject =  {
        name: '',
        url:'',
        articles: '',
        searchPreferences
    } 
    return newsObject;
}

export default createNewsObject;