const {NextResponse} = require('next/server')
const { mongooseConnect } = require("@server/mongoose") ;

const User = require('@server/models/Users')

export const GET = async (request) =>{

    const userDataJSON = await request.headers.get('X-User-Data');
    console.log('userDataJSON: ',userDataJSON)
    const {userData} = JSON.parse(userDataJSON);
    console.log('userData: ',userData);

    try {
        const foundUser = await User.findOne({id: userData.userId})
        const user = {
            id: foundUser.id,
            emailAddress: foundUser.emailAddress,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userImage: foundUser.userImage,
            following: foundUser.following,
            readLater: foundUser.readLater
        }
        return NextResponse.json({success: true, user: user})
    } catch (error) {
        NextResponse.json({success:false, messsage: error.toString()});
    }
}
