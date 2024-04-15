const jwt = require('jsonwebtoken');
// Middleware

const verifyUserToken = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
    
            // Attempt to verify token with ACCESS_TOKEN_SECRET_KEY
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                req.decoded = decoded;
                // console.log('Token verified with ACCESS_TOKEN_SECRET_KEY');
                next();
                return; // Exit function if verification successful
            } catch (accessTokenError) {
                console.error('Token verification failed with ACCESS_TOKEN_SECRET_KEY:', accessTokenError.message);
            }
    
            // Attempt to verify token with REFRESH_TOKEN_SECRET_KEY
            try {
                const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
                req.decoded = decoded;
                // console.log('Token verified with REFRESH_TOKEN_SECRET_KEY');
                next();
                return; // Exit function if verification successful
            } catch (refreshTokenError) {
                console.error('Token verification failed with REFRESH_TOKEN_SECRET_KEY:', refreshTokenError.message);
            }
    
            // If both verification attempts fail, return an error
            throw {
                status: 401,
                message: 'Invalid Token'
            };
        } else {
            throw {
                status: 401,
                message: 'Missing Token'
            };
        }
    } catch (error) {
        res.status(error.status || 401).json({ message: error.message });
    }
};

module.exports = verifyUserToken;