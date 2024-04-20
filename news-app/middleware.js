const { NextResponse } = require('next/server');
const verifyUserToken = require('@server/lib/auth/tokens/verifyUserToken')

export const middleware = async (request) => {

    try {
        console.log('Middleware!');
        const bearerToken = request.headers.get('Authorization');
        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            // console.log(`Token: ${token}`);
            const userData = await verifyUserToken(token);
        
            if (!userData) {
                throw new Error('Invalid Token');
            }
    
            // console.log(`Token verified: `, userData);
     
            
            const response = NextResponse.next();
            response.headers.set('X-User-Data', JSON.stringify(userData));

    
            return response;
        } else {
            throw new Error('Missing Token');
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 401,
            message: 'Missing Token',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// Configuration to apply this middleware only to specific paths
export const config = {
    matcher: ['/api/users/get-user', '/api/users/delete-user', '/api/users/update-user'],
};
