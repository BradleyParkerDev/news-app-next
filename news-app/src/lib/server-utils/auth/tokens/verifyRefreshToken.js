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