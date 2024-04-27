import { Inter } from "next/font/google";
import "@client/styles/globals.css";

import { AuthProvider } from "@client/context/AuthContext";
import { UserProvider } from "@client/context/UserContext";
import { NewsProvider } from "@client/context/NewsContext";

import NavBar from "../components/NavBar/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "News App",
	description: "A fullstack application that uses the NewsAPI.",
};


export default function RootLayout({ children }) {
	return (
		<html lang="en">

			<body className={`flex justify-center w-[screen] h-[screen] bg-[lightblue] ${inter.className}`}>
				<AuthProvider>
					<UserProvider>
						<NewsProvider>
								<div className="h-screen w-[100%] max-w-[1440px] bg-white border-black border-dashed border-[1px]">
										<NavBar />
										{children}									

								</div>


						</NewsProvider>
					</UserProvider>
				</AuthProvider>
			</body>						
		</html>
	);
};
