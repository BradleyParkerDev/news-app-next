const { SignJWT } = require('jose');
const { TextEncoder } = require('util'); // Correct import for TextEncoder

const generateUserTokens = async (userData, oldRefreshTokenExp) => {
    const encoder = new TextEncoder();

    // Calculate expiration time for the new refresh token
    let refreshTokenExp;
    if (oldRefreshTokenExp) {
        // Use the remaining time in seconds for old refresh token as the duration
        refreshTokenExp = `${Math.floor((oldRefreshTokenExp - Date.now() / 1000) / 60)}m`;
    } else {
        // Set expiration time to 7 days if old refresh token expiration is not present
        refreshTokenExp = '7d';  // 7 days
    }



    const accessTokenExp = Math.floor(Date.now() / 1000) + 15; // 15 seconds
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 60; // 1 minute

    // Prepare keys
    const accessTokenSecretKey = encoder.encode(process.env.ACCESS_TOKEN_SECRET_KEY);
    const refreshTokenSecretKey = encoder.encode(process.env.REFRESH_TOKEN_SECRET_KEY);

    // Prepare payloads and set headers
    const accessTokenPayload = {
        userData,
        type: 'access'
    };

    const refreshTokenPayload = {
        userData,
        type: 'refresh'
    };

    // Generate Access Token with 15 minutes expiration
    const accessToken = await new SignJWT(accessTokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(accessTokenExp)  // 15 minutes
        .sign(accessTokenSecretKey);

    // Generate Refresh Token with dynamic expiration based on oldRefreshTokenExp
    const refreshToken = await new SignJWT(refreshTokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(refreshTokenExp)
        .sign(refreshTokenSecretKey);
    return { accessToken, refreshToken };
};

module.exports = generateUserTokens;






































// const jwt = require('jsonwebtoken');

// const generateUserTokens = (userData, oldRefreshTokenExp) => {


    

//     // const accessTokenExp = Math.floor(Date.now() / 1000) + 15; // 15 seconds
//     const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
//     // const accessTokenExp = Math.floor(Date.now() / 1000) + 60; // 1 minute

//     // Calculate expiration time for the new refresh token
//     let refreshTokenExp;
//     if (oldRefreshTokenExp) {
//         refreshTokenExp = oldRefreshTokenExp; // Use the expiration time of the old refresh token
//     } else {
//         // Set expiration time to 7 days if old refresh token expiration is not present
//         refreshTokenExp = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
 
//     }

//     const accessTokenPayload = {
//         userData,
//         exp: accessTokenExp,
//         type: 'access'
//     }

//     const refreshTokenPayload = {
//         userData,
//         exp: refreshTokenExp,
//         type: 'refresh'
//     }
//     const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
//     const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

//     const accessToken = jwt.sign(accessTokenPayload, accessTokenSecretKey);
//     const refreshToken = jwt.sign(refreshTokenPayload, refreshTokenSecretKey);
//     return {accessToken, refreshToken};

// };

// module.exports = generateUserTokens;