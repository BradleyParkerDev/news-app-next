import axios from "axios";

const fetchNews = async(newsObj,dispatch) => {

    if(!newsObj.query){
        if(newsObj.name === 'top-headlines' && !newsObj.query){
            const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}`
            
            try {
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                dispatch({type:'FETCH_TOP_HEADLINES', payload: newsResponse.data.articles})
                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }

        }


        if(newsObj.name !== 'top-headlines' && !newsObj.query){

            const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}&category=${newsObj.name}`

            try {
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                dispatch({type:'FETCH_NEWS_BY_CATEGORY', payload: {category:`${newsObj.name}`, articles:newsResponse.data.articles}})

                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }

        }        
    }


    if(newsObj.query){
        if(newsObj.endpoint === 'top-headlines'){
            const url = `https://newsapi.org/v2/top-headlines?q=${newsObj.query}`    
            try {
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }   
        }
        if(newsObj.endpoint === 'everything'){
            if(newsObj.startDate && newsObj.endDate){
                const url = `https://newsapi.org/v2/everything?q=${newsObj.query}`

                try {
                    // console.log('fetching news...')
                    const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                    return newsResponse.data.articles 
                } catch (error) {
                    console.error('Error fetching news:', error);
                } 
            }else{
                const url = `https://newsapi.org/v2/everything?q=${newsObj.query}`
                try {
                    const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                    return newsResponse.data.articles 
                } catch (error) {
                    console.error('Error fetching news:', error);
                } 
            }


        }


    }

}

export default fetchNews;
