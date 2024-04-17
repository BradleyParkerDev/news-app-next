const jwt = require('jsonwebtoken');


const verifyRefreshToken = (refreshToken) => {

    try {

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        console.log(decoded)
        const userData = {
            date: Date(),
            userId : decoded.userData.userId,
            emailAddress: decoded.userData.emailAddress
        }
        
        return {decoded, userData}

    } catch (error) {
        console.log(`Error verifying refresh token: ${error}`)
        
    }


}

module.exports = verifyRefreshToken;


// const { jwtVerify } = require('jose');
// const { TextEncoder } = require('util');  // Import TextEncoder from util

// const verifyRefreshToken = async (refreshToken) => {
//     try {
//         // Encode the secret key
//         const encodedKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY);

//         // Verify the token
//         const { payload } = await jwtVerify(refreshToken, encodedKey);

//         // Extract user data from the decoded payload
//         const userData = {
//             date: new Date(),
//             userId: payload.userData.userId,
//             emailAddress: payload.userData.emailAddress
//         };
        
//         console.log(payload);
//         return { decoded: payload, userData };

//     } catch (error) {
//         console.log(`Error verifying refresh token: ${error}`);
//         return null;  // Consider how you want to handle errors: return null, throw error, etc.
//     }
// };

// module.exports = verifyRefreshToken;
