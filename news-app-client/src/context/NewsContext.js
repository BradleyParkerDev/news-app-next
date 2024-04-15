import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from 'axios';
import { fetchNews, createNewsObject, setLocalStorageData} from "../lib";
export const NewsContext = createContext();

const categories = {
    business: {
        name: 'business',
        country: 'us',
        articles:[],
        loadingCategory: true
    },
    entertainment: {
        name: 'entertainment',
        country: 'us',
        articles:[],
        loadingCategory: true
    },
    general: {
        name: 'general',
        country: 'us',
        articles:[],
        loadingCategory: true
    },
    health: {
        name: 'health',
        country: 'us',
        articles:[],
        loadingCategory: true
    },
    science: {
        name: 'science',
        country: 'us',
        articles:[],
        loadingCategory: true
    },
    sports: {
        name: 'sports',
        country: 'us',
        articles:[],
        loadingCategory: true
    },
    technology: {
        name: 'technology',
        country: 'us',
        articles:[],
        loadingCategory: true
    }
};

const topHeadlines ={
    name: 'top-headlines',
    country: 'us',
    articles:[],
    loadingTopHeadlines: true
}
const query = {
    endpoint:'everything',
    startDate: '',
    endDate: '',
    country:'us',
    query: '',
}

const initialState = {
    topHeadlines,
    categories,
    query,
    loadingNews: true
};

const newsReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_TOP_HEADLINES':
            return { ...state, topHeadlines: { ...state.topHeadlines, articles: action.payload, loadingTopHeadlines: false} };
        case 'FETCH_NEWS_BY_CATEGORY':
            return { ...state, categories: { ...state.categories, [action.payload.category]: { ...state.categories[action.payload.category], articles: action.payload.articles, loadingCategory: false } } };
        case 'QUERY_NEWS_API':
            return
        case 'RESET_QUERY':
            return
        default:
            return state;
    }
};

export const NewsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(newsReducer, initialState);
    const {topHeadlines, categories, query} = state;
    const {business, entertainment, general, health, science, sports, technology } = categories;
    useEffect(() => {

        const fetchData = async () => {

            // Fetch Top Headlines
            fetchNews(topHeadlines,dispatch)

            // Fetch news for each category
            for (const category of Object.values(categories)) {
                fetchNews(category, dispatch);
            }

        };
        if(topHeadlines){
            fetchData();            
        }

        console.log()
        


    }, []);
    



    return (
        <NewsContext.Provider value={{ state, dispatch }}>
            {children}
        </NewsContext.Provider>
    );
};
