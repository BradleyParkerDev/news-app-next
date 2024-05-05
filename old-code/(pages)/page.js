"use client"; // This line marks the component for client-side execution
import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home
// import React, { useContext, useEffect, useState } from 'react';
// import { NewsContext } from '@client/context/NewsContext';
// import ArticleCard from '@client/components/ArticleCard/ArticleCard';
// import { Button } from '../components/ui/button';
// const Home = () => {
    // const { state: news } = useContext(NewsContext);
    // const { topHeadlines, categories } = news;

    // const testArticle = {

    
    //     source: {
    //         id: "bloomberg",
    //         name: "Bloomberg"
    //     },
    //     author: "Edward Ludlow, Dana Hull",
    //     title: "Tesla (TSLA) Cybertruck Recall Is Latest Setback to Stock's Rough 2024 - Bloomberg",
    //     description: "The stock is sliding, a cheaper electric car is deprioritized and the CEO is riling the workforce with his biggest layoffs yet.",
    //     url: "https://www.bloomberg.com/news/features/2024-04-21/tesla-tsla-cybertruck-recall-is-latest-setback-to-stock-s-rough-2024",
    //     urlToImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iIeIr9Okwhao/v1/1200x800.jpg",
    //     publishedAt: "2024-04-21T20:00:04Z",
    //     content: "Elon Musks underlings at Tesla Inc. are accustomed to chaos. It comes with the territory of working for a chief executive who sets exacting targets and often abruptly switches directions whose biogra… [+580 chars]"
    
    // }


    // const [article, setArticle] = useState(testArticle)

    // const renderArticles = (articles) => {
    //     return (
    //         <ul className='font-bold'>
    //             {articles.map((article, index) => (
    //                 <li key={index}>
    //                     <a href={article.url}>{article.title}</a>
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // };

    // return (
    //     <div>
            {/* <Button>Press me!</Button>
            <ArticleCard article={article} />
            <h1>Top Headlines</h1>
            {topHeadlines.loadingTopHeadlines ? (
                <p>Loading Top Headlines...</p>
            ) : (
                renderArticles(topHeadlines.articles)
            )}

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
            ))} */}
//         </div>
//     );
// };

// export default Home;
