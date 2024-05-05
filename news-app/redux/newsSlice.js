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
            state.news = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setNews, setSelectedCategory, setIsLoading, setError } = newsSlice.actions;

export default newsSlice.reducer;
