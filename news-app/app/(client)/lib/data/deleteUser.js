"use client";

import axios from "axios";
import logoutUser from "../auth/logoutUser";
const urlEndPoint = process.env.NEXT_PUBLIC_BASE_URL

const deleteUser = async () =>{
    try {
        const response = await axios.delete(`${urlEndPoint}/users/delete-user`);
        console.log(`User successfully deleted!`)
    } catch (error) {
        console.log(error)
    }

    logoutUser()

}

export default deleteUser;