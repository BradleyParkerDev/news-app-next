const User = require('@server/models/Users');
const { mongooseConnect } = require("@server/mongoose") ;
const getTokenExpiration = require('./getTokenExpiration');
const generateUserTokens = require('./generateUserTokens');
const verifyRefreshToken = require('./verifyRefreshToken');



const checkUserRefreshTokens = async(oldRefreshToken, NextResponse) =>{

    await mongooseConnect();

    const { decoded, userData } = await verifyRefreshToken(oldRefreshToken);
    const id = userData.userId
    // console.log('decoded in checkUserRefreshTokens: ', decoded)
    // console.log('userData in checkUserRefreshTokens: ', userData)
    // Find the user by their ID

    // console.log('userId in checkUserRefreshTokens: ', id)

    const foundUser = await User.findOne({ id: userData.userId });
    if (!foundUser) {
        return NextResponse.status(404).json({ success: false, message: 'User not found' });
    }

    // console.log('foundUser: ',foundUser)

    // Check if the provided refresh token exists in the user's refreshTokens array
    const refreshTokenIndex = foundUser.refreshTokens.findIndex(token => token === oldRefreshToken);
    if (refreshTokenIndex === -1) {
        NextResponse.status(403).json({ success: false, message: 'Invalid refresh token' });
        return 
    }



    // Remove the old refresh token from the refreshTokens array
    foundUser.refreshTokens.splice(refreshTokenIndex, 1);


    // Generate new access and refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateUserTokens(userData, decoded.exp);


    // Add the new refresh token to the refreshTokens array
    foundUser.refreshTokens.push(newRefreshToken);
    await foundUser.save();


    const refreshTokenExpiration = await getTokenExpiration(newRefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const accessTokenExpiration = await getTokenExpiration(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)

    return {
        newRefreshToken,
        refreshTokenExpiration,
        accessToken,
        accessTokenExpiration
    };


}

module.exports = checkUserRefreshTokens;