"use client";

import { setUserData } from '@redux/userSlice';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, fetchNews, authCheck } from "@client/lib";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from 'next/link';
import { LayoutGridIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";
import { React, useState, useEffect, useContext } from "react";


const NavBar =  (props) => {

	const dispatch = useDispatch()

  	const news = useSelector((state) => state.news)
	const auth = useSelector((state) => state.auth)
	const user = useSelector((state) => state.user)

	const [sideNav, setSideNav] = useState({isOpen:false,width:'0px'})

    const { topHeadlines, categories } = news;


	useEffect(()=>{


		// Fetch news 

		// Implementing window Check
		if (typeof window !== "undefined") {
		const fetchData = async () => {

			// Fetch Top Headlines
			fetchNews(dispatch, topHeadlines)

			// Fetch news for each category
			for (const category of Object.values(categories)) {
				fetchNews(dispatch, category);
			}

		};

		// if(topHeadlines){
			fetchData();   
					
		// }
		
		}

	},[])



	useEffect(()=>{
		// Authentication check
		if(!auth.accessToken){
			authCheck(dispatch, auth)
		}

		// Fetch user data
        if (typeof window !== "undefined") {
            const fetchData = async () => {
                if(auth.accessToken){
                    try {
                        const user = await fetchUserData();
                        console.log(user)
                        if (user) {
                            dispatch(setUserData({ user:user }));
                        }                                       
            
                    } catch (error) {
                        console.error('Error setting user data:', error);
                    }   
                    
                    if(auth.isAuth){
                        console.log(`isAuth: ${auth.isAuth}`)
                    }                
                }



            };
        
            fetchData();
        }



	},[auth.accessToken])

	const handleSideNav =  (request) =>{
		if(request === 'open'){
			const screenWidth = window.innerWidth;
            if (screenWidth < 300) {
				setSideNav({isOpen:true,width:'100%'})

            }else{
				setSideNav({isOpen:true,width:'300px'})

			}
			console.log(open)
		} 
		
		if(request === 'close'){
			setSideNav({isOpen:false,width:'0px'})
		}
	}

	const hiddenContent =  () =>{
        return (
            <div style={{width: `${sideNav.width}`, transition: '0.25s'}} className="z-10 top-0 left-0 fixed h-screen bg-white border-solid border-[1px] border-r-black overflow-x-hidden ">
				<div className="flex justify-end">
					<p onClick={() => { handleSideNav('close'); }}>close</p>

				</div>
				<Link href="/">
					<p>Home</p>
				</Link>	
				<Link href="/categories">
					<p>Explore Categories</p>
				</Link>	
				<Link href="/read-later">
					<p>Read Later</p>
				</Link>						
				<Link href="/user">
					<p>user</p>
				</Link>	


            </div>
        );
	}

  	return (

		<div className="w-screen flex dashed-outline">

				{hiddenContent()}

				<MenuIcon className="mt-[20px] ml-[20px]" size={36} strokeWidth={2} onClick={()=>{handleSideNav('open')}}/>
				<p className="font-bungee-shade text-[40px]">News App</p>
		</div>
	
  	);
};

export default NavBar;

{/* <Menu size={36} strokeWidth={1} /> */}