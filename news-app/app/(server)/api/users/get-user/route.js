const {NextResponse} = require('next/server')
const { mongooseConnect } = require("@server/mongoose") ;

const User = require('@server/models/Users')

export const GET = async (request) =>{

    const userDataJSON = await request.headers.get('X-User-Data');
    const {userData} = JSON.parse(userDataJSON);
    // console.log('userData: ',userData);

    try {
        const foundUser = await User.findOne({id: userData.userId})
        const user = {
            id: foundUser.id,
            emailAddress: foundUser.emailAddress,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userImage: foundUser.userImage,
            readLater: foundUser.readLater,
            lastUpdated: foundUser.lastUpdated
        }
        // console.log('user: ', user)
        return NextResponse.json({success: true, userData: user})
    } catch (error) {
        NextResponse.json({success:false, messsage: error.toString()});
    }
}
