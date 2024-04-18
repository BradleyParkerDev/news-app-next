const { checkUserRefreshTokens } = require('@server/lib/auth');
const {NextResponse} = require('next/server')

export const POST = async (req) =>{
    const requestBody = await req.json();
    const oldRefreshToken = requestBody.refreshToken;

    console.log('oldeRefreshToken: ', oldRefreshToken)
    if (oldRefreshToken) {
        try {
            const {
                newRefreshToken,
                refreshTokenExpiration,
                accessToken,
                accessTokenExpiration
            } = await checkUserRefreshTokens(oldRefreshToken, NextResponse);

            return NextResponse.json({ 
                success: true, 
                message: 'New refresh and access tokens sent in cookies.', 
                newRefreshToken,
                refreshTokenExpiration,
                accessToken,
                accessTokenExpiration
            });
        } catch (error) {
            console.error('Error refreshing access token:', error);
            return NextResponse.status(500).json({ 
                success: false, 
                message: 'Internal server error', 
                error: error.message // Include error message in response
            });
        }
    } else {
        return NextResponse.status(400).json({
            success: false,
            message: 'Old refresh token is missing in the request body.',
            oldRefreshToken
        });
    }
};

