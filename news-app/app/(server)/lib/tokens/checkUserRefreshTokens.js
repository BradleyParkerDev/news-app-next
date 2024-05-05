const User = require('@server/models/Users');
const { mongooseConnect } = require("@server/mongoose") ;
const getTokenExpiration = require('./getTokenExpiration');
const generateUserTokens = require('./generateUserTokens');
const verifyRefreshToken = require('./verifyRefreshToken');
const hashRefreshToken = require('../hashing/hashRefreshToken')
const bcrypt = require('bcrypt');


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
    const refreshTokenIndex = foundUser.refreshTokens.findIndex(async (storedHash) => await bcrypt.compare(oldRefreshToken, storedHash));
    if (refreshTokenIndex === -1) {
        NextResponse.status(403).json({ success: false, message: 'Invalid refresh token' });
        return 
    }



    // Remove the old refresh token from the refreshTokens array
    foundUser.refreshTokens.splice(refreshTokenIndex, 1);


    // Generate new access and refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateUserTokens(userData, decoded.exp);


    // Hash th new refresh token  and then add it to the refreshTokens array
    try {
        const saltRounds = 5;
        const hashedRefreshToken = await hashRefreshToken(newRefreshToken, saltRounds)
        foundUser.refreshTokens.push(hashedRefreshToken);
        await foundUser.save(); 
        
        
        console.log(`New Refresh Token:  ${newRefreshToken}`)
        console.log(`Hashed Refresh Token:  ${hashedRefreshToken}`)

    } catch (error) {
       console.log(`Error hashing and storing new refresh token: ${error}`) 
    }



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