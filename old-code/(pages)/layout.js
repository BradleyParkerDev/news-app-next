import { Inter } from "next/font/google";
import "@client/styles/globals.css";

import { Provider } from 'react-redux';
import store from '../../news-app/redux/store';

// import NavBar from "../components/NavBar/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "News App",
	description: "A fullstack application that uses the NewsAPI.",
};


export default function RootLayout({ children }) {
	return (
		<html lang="en">

			<body className={`flex justify-center w-[screen] h-[screen] bg-[lightblue] ${inter.className}`}>

						    <Provider store={store}>
								<div className="h-[screen] w-[100%] max-w-[1440px] bg-white border-black border-dashed border-[1px]">
										{/* <NavBar /> */}
										{children}									

								</div>								
							</Provider>


			</body>						
		</html>
	);
};
