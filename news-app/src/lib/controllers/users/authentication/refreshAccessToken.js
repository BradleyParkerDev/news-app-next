const { checkUserRefreshTokens } = require('../../../auth');

const refreshAccessToken = async (req, res) => {
    const oldRefreshToken = req.body.refreshToken;

    if (oldRefreshToken) {
        try {
            const {
                newRefreshToken,
                refreshTokenExpiration,
                accessToken,
                accessTokenExpiration
            } = await checkUserRefreshTokens(oldRefreshToken, res);

            res.json({ 
                success: true, 
                message: 'New refresh and access tokens sent in cookies.', 
                newRefreshToken,
                refreshTokenExpiration,
                accessToken,
                accessTokenExpiration
            });
        } catch (error) {
            console.error('Error refreshing access token:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error', 
                error: error.message // Include error message in response
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Old refresh token is missing in the request body.'
        });
    }
};

module.exports = refreshAccessToken;
