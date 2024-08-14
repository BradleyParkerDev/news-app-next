'use client';


import React, { useState } from 'react';

import ArticleCard from '@client/components/ArticleCard/ArticleCard';

import { useSelector} from 'react-redux';

const Categories = () => {


	const news = useSelector((state) => state.news)



	// console.log(news)
    const { categories } = news;

    const renderArticles = (articles) => {
        return (
            articles.map((article, index) => (
                <ArticleCard article={article}/>
            ))
        );
    };

    return (
        <div className=''>
			{/* <LandingPage /> */}
            <h1>Categories</h1>
            {Object.values(categories).map(category => (
                <div style={{overflowX:"scroll"}} key={category.name} className='flex w-[10000px] overflow-x-scroll'>
                    <h1>{category.name}</h1>
					{category.loadingCategory ? (
						<p>Loading {category.name} articles...</p>
					) : (
						renderArticles(category.articles)
					)}						

                </div>
            ))}
         </div>
    )
}

export default Categories;