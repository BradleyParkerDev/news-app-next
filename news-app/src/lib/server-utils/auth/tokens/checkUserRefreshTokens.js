const User = require('../../../models/Users');
const { mongooseConnect } = require("@/lib/mongoose") ;
const getTokenExpiration = require('./getTokenExpiration');
const generateUserTokens = require('./generateUserTokens');
const verifyRefreshToken = require('./verifyRefreshToken');



const checkUserRefreshTokens = async(oldRefreshToken, NextResponse) =>{


    const { decoded, userData } = verifyRefreshToken(oldRefreshToken);

    await mongooseConnect();
    // Find the user by their ID
    const foundUser = await User.findOne({ id: userData.userId });
    if (!foundUser) {
        return NextResponse.status(404).json({ success: false, message: 'User not found' });
    }



    // Check if the provided refresh token exists in the user's refreshTokens array
    const refreshTokenIndex = foundUser.refreshTokens.findIndex(token => token === oldRefreshToken);
    if (refreshTokenIndex === -1) {
        NextResponse.status(403).json({ success: false, message: 'Invalid refresh token' });
        return 
    }



    // Remove the old refresh token from the refreshTokens array
    foundUser.refreshTokens.splice(refreshTokenIndex, 1);


    // Generate new access and refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = generateUserTokens(userData, decoded.exp);


    // Add the new refresh token to the refreshTokens array
    foundUser.refreshTokens.push(newRefreshToken);
    await foundUser.save();


    const refreshTokenExpiration = getTokenExpiration(newRefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const accessTokenExpiration = getTokenExpiration(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)

    return {
        newRefreshToken,
        refreshTokenExpiration,
        accessToken,
        accessTokenExpiration
    };


}

module.exports = checkUserRefreshTokens;