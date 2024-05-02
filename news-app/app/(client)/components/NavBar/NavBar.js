"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from 'next/link';
import { LayoutGridIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";

import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "@client/context/UserContext";
import { AuthContext } from "@client/context/AuthContext";



const NavBar =  (props) => {
    const { state: userState } = useContext(UserContext);
    const { firstName, lastName, emailAddress, loadingUser } = userState; // Consider using these if needed

    const { state: authState } = useContext(AuthContext);
    const { isAuth, authLoading } = authState; // Consider using these if needed
	const [sideNav, setSideNav] = useState({isOpen:false,width:'0px'})



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
            <div style={{width: `${sideNav.width}`, transition: '0.5s'}} className="z-10 top-0 left-0 fixed h-screen bg-white border-solid border-[1px] border-r-black overflow-x-hidden ">
				<div className="flex justify-end">
					<p onClick={() => { handleSideNav('close'); }}>close</p>

				</div>
				<Link href="/">
							<p>Home</p>
						</Link>						
						<Link href="/settings">
							<p>Settings</p>
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