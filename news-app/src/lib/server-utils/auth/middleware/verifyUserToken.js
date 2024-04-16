import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
    try {
        const bearerToken = req.headers.get('authorization');
        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            let verified = false;
            let decoded;

            // Try verifying with ACCESS_TOKEN_SECRET_KEY
            try {
                decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                req.nextUrl.searchParams.set('decoded', JSON.stringify(decoded)); // Pass data to Next.js pages or API routes
                verified = true;
            } catch (accessTokenError) {
                console.error('Token verification failed with ACCESS_TOKEN_SECRET_KEY:', accessTokenError.message);
            }

            // If ACCESS_TOKEN verification fails, try with REFRESH_TOKEN_SECRET_KEY
            if (!verified) {
                try {
                    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
                    req.nextUrl.searchParams.set('decoded', JSON.stringify(decoded)); // Pass data to Next.js pages or API routes
                    verified = true;
                } catch (refreshTokenError) {
                    console.error('Token verification failed with REFRESH_TOKEN_SECRET_KEY:', refreshTokenError.message);
                }
            }

            if (!verified) {
                throw new Error('Invalid Token');
            }

            return NextResponse.next();
        } else {
            throw new Error('Missing Token');
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// Configuration to apply this middleware only to specific paths
export const config = {
    matcher: ['/api/get-user', '/api/delete-user', '/api/update-user'],
};
