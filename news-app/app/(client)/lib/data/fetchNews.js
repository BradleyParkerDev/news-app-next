"use client";

import axios from "axios";
import setLocalStorageData from "./setLocalStorageData";
import getLocalStorageData from "./getLocalStorageData";
import {setNews} from "@redux/newsSlice";
const fetchNews = async(dispatch, newsObj, update) => {

    // Checking local storage
    console.log(`Checking local storage for ${newsObj.name}.`)
    const localStorageNewsData = getLocalStorageData(newsObj.name)
    if(localStorageNewsData !== null) {
        const timeToUpdateNews =  (Date.now() - localStorageNewsData.lastUpdated)
        const anHour = 3600000
        if(timeToUpdateNews < anHour && update !== false){
            console.log(`${newsObj.name} is up to date! Using local storage.`)

            if(localStorageNewsData.name === 'top-headlines'){
                dispatch(setNews({type:'top-headlines', payload: {articles:localStorageNewsData.articles , lastUpdated: Date.now()}}))
            }
            if(localStorageNewsData.name !== 'top-headlines'){
                dispatch(setNews({type:'category', payload: {category:`${localStorageNewsData.name}`, articles:localStorageNewsData.articles , lastUpdated: Date.now()}}))

            }
        }
        if(timeToUpdateNews > anHour && update !== false){
            console.log(`${newsObj.name} needs to be updated, calling api.`)
        }       
    }else{
        console.log(`Local storage is empty, calling api.`)
    }




    // Fetching news for non-queries--top headlines and categories.
    if(!newsObj.query){
        if(newsObj.name === 'top-headlines' && !newsObj.query){
            const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}`
            
            try {
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
                dispatch(setNews({type:'top-headlines', payload: {articles:newsResponse.data.articles , lastUpdated: Date.now()}}))
                
                const newsObjectForLocalStorage ={
                    name: 'top-headlines',
                    country: 'us',
                    articles:newsResponse.data.articles,
                    lastUpdated: Date.now(),
                }
                setLocalStorageData(newsObjectForLocalStorage.name, newsObjectForLocalStorage)

                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }

        }


        if(newsObj.name !== 'top-headlines' && !newsObj.query){

            const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}&category=${newsObj.name}`

            try {
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
                dispatch(setNews({type:'category', payload: {category:`${newsObj.name}`, articles:newsResponse.data.articles , lastUpdated: Date.now()}}))

                const newsObjectForLocalStorage = {
                    name: `${newsObj.name}`,
                    country: 'us',
                    articles: newsResponse.data.articles,
                    lastUpdated: Date.now(),
                    loadingCategory: true
                }

                setLocalStorageData(newsObjectForLocalStorage.name, newsObjectForLocalStorage)

                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }

        }        
    }


    // Fetches news for query
    if(newsObj.query){
        if(newsObj.endpoint === 'top-headlines'){
            const url = `https://newsapi.org/v2/top-headlines?q=${newsObj.query}`    
            try {
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
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
                    const newsResponse = await axios.get(`${url}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
                    return newsResponse.data.articles 
                } catch (error) {
                    console.error('Error fetching news:', error);
                } 
            }else{
                const url = `https://newsapi.org/v2/everything?q=${newsObj.query}`
                try {
                    const newsResponse = await axios.get(`${url}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
                    return newsResponse.data.articles 
                } catch (error) {
                    console.error('Error fetching news:', error);
                } 
            }


        }


    }

}

export default fetchNews;
