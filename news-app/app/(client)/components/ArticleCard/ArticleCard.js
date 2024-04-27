import  { React, useContext, useState, useEffect } from 'react'
import { updateUserData } from '@client/lib';
import { UserContext } from '@client/context/UserContext';
import { AuthContext } from '@client/context/AuthContext';
import Image from 'next/image';
import {
	Card,
	CardContent,
	CardHeader,
} from "@client/components/ui/card"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@client/components/ui/popover"
import { Bookmark, BookmarkCheckIcon, Share2 } from 'lucide-react';

const ArticleCard = (props) => {
	const { state: authState} = useContext(AuthContext);
	const {isAuth} = authState;

	const { state: userState } = useContext(UserContext);
    const {readLater} = userState;

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
		<Card className="my-4 mx-2 relative" style={{ width: '300px' }}>
		  <div style={{ height: '140px', overflow: 'hidden' }}>
			<img
			  src={article.urlToImage}
			  alt={article.title}
			  style={{ width: '100%', height: 'auto', display: 'block' }}
			/>
		  </div>
		  <CardHeader 
			title={article.title}
			subheader={`${article.source.name} - ${article.author}`}
		  />
		  <CardContent>
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
