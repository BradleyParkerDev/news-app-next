"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from 'axios';
import { fetchNews, createNewsObject, setLocalStorageData} from "@client/lib";
export const NewsContext = createContext();

const categories = {
    business: {
        name: 'business',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    },
    entertainment: {
        name: 'entertainment',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    },
    general: {
        name: 'general',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    },
    health: {
        name: 'health',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    },
    science: {
        name: 'science',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    },
    sports: {
        name: 'sports',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    },
    technology: {
        name: 'technology',
        country: 'us',
        articles:[],
        lastUpdated: Date.now(),
        loadingCategory: true
    }
};

const topHeadlines ={
    name: 'top-headlines',
    country: 'us',
    articles:[],
    lastUpdated: Date.now(),
    loadingTopHeadlines: true
}
const query = {
    name: 'query',
    endpoint:'everything',
    startDate: '',
    endDate: '',
    country:'us',
    query: '',
    articles:[]
}

const initialState = {
    topHeadlines,
    categories,
    query,
    loadingNews: true,
};

const newsReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_TOP_HEADLINES':
            return { ...state, loadingNews:false, topHeadlines: { ...state.topHeadlines, lastUpdated: action.payload.lastUpdated ,articles: action.payload.articles, loadingTopHeadlines: false} };
        case 'FETCH_NEWS_BY_CATEGORY':
            return { ...state, loadingNews:false, categories: { ...state.categories, [action.payload.category]: { ...state.categories[action.payload.category], lastUpdated: action.payload.lastUpdated, articles: action.payload.articles, loadingCategory: false } } };
        default:
            return state;
    }
};

export const NewsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(newsReducer, initialState);
    const {topHeadlines, categories, query} = state;
    const {business, entertainment, general, health, science, sports, technology } = categories;
    useEffect(() => {
        // Implementing window Check
        if (typeof window !== "undefined") {
        const fetchData = async () => {

            // Fetch Top Headlines
            fetchNews(topHeadlines)

            // Fetch news for each category
            for (const category of Object.values(categories)) {
                fetchNews(category);
            }

        };

        // if(topHeadlines){
            fetchData();   
                    
        // }
        
        }

    }, []);
    



    return (
        <NewsContext.Provider value={{ state, dispatch }}>
            {children}
        </NewsContext.Provider>
    );
};
