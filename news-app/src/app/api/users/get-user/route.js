const {NextResponse, NextRequest} = require('next/server')
const User = require('@/lib/models/Users')

// const {verifyUserToken} = require('@/lib/server-utils/auth')


export const GET = async () =>{
    // try {
        // const id = req.decoded.userData.userId
        // const foundUser = await User.findOne({id:id})
        // userData = {
        //     id: foundUser.id,
        //     emailAddress: foundUser.emailAddress,
        //     firstName: foundUser.firstName,
        //     lastName: foundUser.lastName,
        //     userImage: foundUser.userImage,
        //     following: foundUser.following,
        //     readLater: foundUser.readLater
        // }
        // console.log(userData)
        return NextResponse.json({success: true})
    // } catch (error) {
    //     NextResponse.json({success:false, messsage: error.toString()});
    // }
}
