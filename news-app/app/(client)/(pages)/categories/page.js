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
            <div className='flex overflow-x-scroll'>
                {articles.map((article, index) => (
					<ArticleCard article={article}/>
                    // <li key={index}>
                    //     <a href={article.url}>{article.title}</a>
                    // </li>
                ))}
            </div>
        );
    };

    return (
        <div>
			{/* <LandingPage /> */}
            <h1>Categories</h1>
            {Object.values(categories).map(category => (
                <div key={category.name}>
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