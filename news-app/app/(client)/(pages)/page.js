'use client';


import React, { useState } from 'react';

import ArticleCard from '@client/components/ArticleCard/ArticleCard';
import { Button } from '../components/ui/button';
import { useSelector} from 'react-redux';
const Home = () => {


	const news = useSelector((state) => state.news)



	// console.log(news)
    const { topHeadlines, categories } = news;



    const testArticle = {

    
        source: {
            id: "bloomberg",
            name: "Bloomberg"
        },
        author: "Edward Ludlow, Dana Hull",
        title: "Tesla (TSLA) Cybertruck Recall Is Latest Setback to Stock's Rough 2024 - Bloomberg",
        description: "The stock is sliding, a cheaper electric car is deprioritized and the CEO is riling the workforce with his biggest layoffs yet.",
        url: "https://www.bloomberg.com/news/features/2024-04-21/tesla-tsla-cybertruck-recall-is-latest-setback-to-stock-s-rough-2024",
        urlToImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iIeIr9Okwhao/v1/1200x800.jpg",
        publishedAt: "2024-04-21T20:00:04Z",
        content: "Elon Musks underlings at Tesla Inc. are accustomed to chaos. It comes with the territory of working for a chief executive who sets exacting targets and often abruptly switches directions whose biogra… [+580 chars]"
    
    }


    const [article, setArticle] = useState(testArticle)

    const renderArticles = (articles) => {
        return (
            articles.map((article, index) => (
                <ArticleCard article={article}/>
            ))
        );
    };

    return (
        <div className='w-[screen] h-[screen]  border-black border-dashed border-[1px] '>
            <h1>Top Headlines</h1>
            <div className='flex flex-wrap justify-evenly w-[screen] h-[screen]  border-black border-dashed border-[1px] '>
                {topHeadlines.loadingTopHeadlines ? (
                    <p>Loading Top Headlines...</p>
                ) : (
                    renderArticles(topHeadlines.articles)
                )}                
            </div>
         </div>
    );
};

export default Home;
