const jwt = require('jsonwebtoken');

const getTokenExpiration = (token, secretKey) => {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return new Date(decodedToken.exp * 1000);

    } catch (error) {
        console.log(`Failed to decode token.`);
        console.log(`Error: ${error}`);
        
    }
};

module.exports = getTokenExpiration;

// const { jwtVerify } = require('jose');
// const { TextEncoder } = require('util');  // Import TextEncoder from util

// const getTokenExpiration = async (token, secretKey) => {
//     try {
//         // Encode the secret key
//         const encodedKey = new TextEncoder().encode(secretKey);

//         // Verify the token and extract the payload
//         const { payload } = await jwtVerify(token, encodedKey);

//         // Return the expiration date as a Date object
//         return new Date(payload.exp * 1000);
//     } catch (error) {
//         console.log('Failed to decode token.');
//         console.log(`Error: ${error}`);
//         return null; // Return null or throw an error as needed
//     }
// };

// module.exports = getTokenExpiration;

