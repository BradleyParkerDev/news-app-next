// Remove: const { TextEncoder } = require('util');
const { jwtVerify } = require('jose');

export const verifyUserToken = async (token) => {
    if (!token) {
        console.error('No token provided');
        return null;
    }

    try {
        const secretAccessKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY);
        const { payload } = await jwtVerify(token, secretAccessKey, {
            algorithms: ['HS256']
        });
        console.log('Token verified with ACCESS_TOKEN_SECRET_KEY:', payload);
        return payload;
    } catch (accessTokenError) {
        console.error('Token verification failed with ACCESS_TOKEN_SECRET_KEY:', accessTokenError.message);
    }

    try {
        const secretRefreshKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET_KEY);
        const { payload } = await jwtVerify(token, secretRefreshKey, {
            algorithms: ['HS256']
        });
        console.log('Token verified with REFRESH_TOKEN_SECRET_KEY:', payload);
        return payload;
    } catch (refreshTokenError) {
        console.error('Token verification failed with REFRESH_TOKEN_SECRET_KEY:', refreshTokenError.message);
    }

    return null;
};
