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
