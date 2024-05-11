"use client";

import  { React, useContext, useState, useEffect } from 'react'
import { updateUserData } from '@client/lib';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, { addRemoveReadLaterArticle } from '@redux/userSlice';
import authSlice from '@redux/authSlice';


import Image from 'next/image';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@client/components/ui/card"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@client/components/ui/popover"
import { Bookmark, BookmarkCheckIcon, Share2 } from 'lucide-react';

const ArticleCard = (props) => {

	const news = useSelector((state) => state.news)
	const auth = useSelector((state) => state.auth)
	const user = useSelector((state) => state.user)

	const dispatch  = useDispatch()
	const {isAuth} = auth;

    const {readLater} = user;

	const {article} = props;
	const [inReadLater, setInReadLater] = useState(false)


	// fix this function
	const handleReadLater = async (request) =>{
        let arr = [...readLater]; // Create a copy of the readLater array to modify

        if (request === 'add' && !arr.includes(article)) {	

			arr.push(article)
			console.log(arr)	
			updateUserData({readLater: arr})

		}

		if(request === 'remove'){

            const position = arr.indexOf(article);
            if (position > -1) {
                arr.splice(position, 1);
            }

			updateUserData({readLater: arr})

		}


	}

    useEffect(() => {
        setInReadLater(readLater.includes(article));
    }, [isAuth, readLater, article]);


	return (
		<Card className="min-w-[] max-w-[300px] h-[350px] my-4 mx-2 relative border-black border-[1px] border-solid">
		  <div style={{ height: '140px', overflow: 'hidden' }}>
			<img
			  src={article.urlToImage}
			  alt={article.title}
			  style={{ width: '100%', height: 'auto', display: 'block' }}
			/>
		  </div>
		  	<CardHeader className='text-[12px] pb-[8px]'>
				<CardTitle className='text-[14px]'>{article.title}</CardTitle>
				<p className='text-[11px] font-bold text-[#545252]'>{`${article.source.name} - ${article.author}`}</p>
			</CardHeader> 		  
			<CardContent  className='text-[12px]'>
				<p>{article.description}</p>
			</CardContent>
			<div className="absolute bottom-0 right-0 p-2 flex">
				{!inReadLater && <Bookmark onClick={()=>{handleReadLater('add')}} className="mx-1 cursor-pointer" size={24} color="gray" />}
				{inReadLater && <BookmarkCheckIcon onClick={()=>{handleReadLater('remove')}} className="mx-1 cursor-pointer" size={24} color="gray" />}
				<Share2 className="mx-1 cursor-pointer" size={24} color="gray" />
			</div>
		</Card>
	);
};

export default ArticleCard;
