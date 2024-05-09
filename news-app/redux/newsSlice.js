'use client';
import { createSlice } from '@reduxjs/toolkit';


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

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNews: (state, action) => {
            if(action.payload.type === 'top-headlines'){
                return { ...state, loadingNews:false, topHeadlines: { ...state.topHeadlines, lastUpdated: action.payload.news.lastUpdated ,articles: action.payload.news.articles, loadingTopHeadlines: false} };

            }
            if(action.payload.type === 'category'){
                return { ...state, loadingNews:false, categories: { ...state.categories, [action.payload.news.category]: { ...state.categories[action.payload.news.category], lastUpdated: action.payload.news.lastUpdated, articles: action.payload.news.articles, loadingCategory: false } } };
            }
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload.news;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.news;
        },
        setError: (state, action) => {
            state.error = action.payload.news;
        },
    },
});



export const { setNews, setSelectedCategory, setIsLoading, setError } = newsSlice.actions;

export default newsSlice.reducer;

