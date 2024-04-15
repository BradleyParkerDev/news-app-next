const jwt = require('jsonwebtoken');


const generateUserTokens = (userData, oldRefreshTokenExp) => {


    

    const accessTokenExp = Math.floor(Date.now() / 1000) + 15; // 15 seconds
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 60; // 1 minute

    // Calculate expiration time for the new refresh token
    let refreshTokenExp;
    if (oldRefreshTokenExp) {
        refreshTokenExp = oldRefreshTokenExp; // Use the expiration time of the old refresh token
    } else {
        // Set expiration time to 7 days if old refresh token expiration is not present
        refreshTokenExp = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
 
    }

    const accessTokenPayload = {
        userData,
        exp: accessTokenExp,
        type: 'access'
    }

    const refreshTokenPayload = {
        userData,
        exp: refreshTokenExp,
        type: 'refresh'
    }
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

    const accessToken = jwt.sign(accessTokenPayload, accessTokenSecretKey);
    const refreshToken = jwt.sign(refreshTokenPayload, refreshTokenSecretKey);
    return {accessToken, refreshToken};

};

module.exports = generateUserTokens;