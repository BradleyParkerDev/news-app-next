// import { NextResponse } from "next/server";



// export const middleware = async (request) =>{
//     console.log('middleware!')

//     console.log(request.method)
//     console.log(request.url)

//     const origin = request.headers.get('Authorization');
//     console.log(origin);
//     const response = NextResponse.next()
//     return NextResponse.next()
// }


const { NextResponse } = require('next/server');
const {jwt} = require('jsonwebtoken');

export const middleware = async (request) =>{
    try {
        
        console.log('Middleware!')
        const bearerToken = request.headers.get('Authorization');
        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            let verified = false;
            let decoded;

            console.log(` token: ${token}`)
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
    matcher: ['/api/users/get-user', '/api/users/delete-user', '/api/users/update-user'],
};
















// // Define allowed origins based on the environment
// const allowedOrigins = process.env.NODE_ENV === 'production'
//     ? ['https://www.yoursite.com', 'https://yoursite.com']
//     : ['http://localhost:3000'];

// // Middleware to check origin of the requests
// export function middleware(request) {
//     const origin = request.headers.get('origin');
//     console.log(origin);

//     // If the origin is not allowed, return a 400 response
//     if (origin && !allowedOrigins.includes(origin)) {
//         return new NextResponse(null, {
//             status: 400,
//             statusText: "Bad Request",
//             headers: {
//                 'Content-Type': 'text/plain'
//             }
//         });
//     }

//     // Log information about the request
//     console.log('Middleware!');
//     console.log(request.method);
//     console.log(request.url);

//     // Proceed with the next middleware or to the resource
//     return NextResponse.next();
// }

// // Configuration for the middleware
// export const config = {
//     matcher: '/api/:path*',
// };
