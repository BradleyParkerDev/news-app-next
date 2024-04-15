// import dbConnect from '@/lib/dbConnect';
import { mongooseConnect } from '@/lib/mongoose';
import User from '@/lib/models/Users';
import { validatePassword, generateUserTokens, getTokenExpiration } from '../../../../lib/server-utils/auth';

export  const POST = async (req,res) => {
    if (req.method !== 'POST') {
        console.log(req)
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
        return;
    }

    try {
        await dbConnect();
        const { emailAddress, password } = req.body;
        const user = await User.findOne({ emailAddress });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Could not find user.' });
        }

        const passwordValid = await validatePassword(password, user.password);

        if (!passwordValid) {
            return res.status(401).json({ success: false, message: 'Password was incorrect.' });
        }

        const userData = {
            date: Date(),
            userId: user.id,
            emailAddress: user.emailAddress
        };

        const { accessToken, refreshToken } = generateUserTokens(userData);
        try {
            user.refreshTokens.push(refreshToken)
            await user.save()            
        } catch (error) {
            console.log(error)
        }
     

        const refreshTokenExpiration = getTokenExpiration(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        const accessTokenExpiration = getTokenExpiration(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
  
        // Respond with success message and any additional data
        res.json({
            success: true,
            message: 'User successfully logged in.',
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
