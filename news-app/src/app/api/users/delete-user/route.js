const { NextResponse } = require('next/server');
const { mongooseConnect } = require("@/lib/mongoose");

const User = require('@/lib/models/Users');

// Delete user endpoint
export const DELETE = async (request) => {
    try {
        const userDataJSON = request.headers.get('X-User-Data');
        if (!userDataJSON) {
            return new NextResponse(JSON.stringify({ success: false, message: 'Missing user data' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const {userData} = JSON.parse(userDataJSON);
        console.log('delete: ',userData.userId)
        const userId = userData.userId;
        console.log('Attempting to delete user with userId:', userId);

        await mongooseConnect();
        const response = await User.deleteOne({ id: userId }); // Ensure this is your custom user ID field

        // Check if the response indicates that a document was deleted
        if (response.deletedCount === 0) {
            console.log('No user found with userId:', userId);
            return new NextResponse(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('User successfully deleted with userId:', userId);
        return new NextResponse(JSON.stringify({ success: true, message: 'User successfully deleted' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        return new NextResponse(JSON.stringify({ success: false, message: 'Error deleting user on the server' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
