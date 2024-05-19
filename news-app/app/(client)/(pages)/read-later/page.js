'use client';


import React, { useState } from 'react';

import ArticleCard from '@client/components/ArticleCard/ArticleCard';

import { useSelector} from 'react-redux';

const ReadLater = () => {



	const user = useSelector((state) => state.user)



	// console.log(user)
    const { readLater } = user;



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
            <h1>Read Later</h1>
            {user.userLoading ? (
                <p>Loading Read Later...</p>
            ) : (
                renderArticles(user.readLater)
            )}
         </div>
    )
}

export default ReadLater;