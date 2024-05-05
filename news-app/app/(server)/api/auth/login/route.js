
const {validatePassword, generateUserTokens, getTokenExpiration, hashRefreshToken} = require('@server/lib')
const { mongooseConnect } = require("@server/mongoose") ;
const User =  require("@server/models/Users");
const {NextResponse} = require('next/server')

export const POST = async (req) =>{
    const requestBody = await req.json()

    try {

        // User login data
        const userLoginData = {
            emailAddress: requestBody.emailAddress,
            password: requestBody.password
        }; 

        // Connecting to MongoDB
        await mongooseConnect();

        // Finding user in database
        const foundUser = await User.findOne({emailAddress: userLoginData.emailAddress});

        // If user not found
        if (!foundUser) {
            return NextResponse.status(404).json({ success: false, message: 'Could not find user.' });
        }

        // Validate password
        const passwordValid = await validatePassword(userLoginData.password, foundUser.password);
        
        // If password not valid
        if (!passwordValid) {
            return NextResponse.status(401).json({ success: false, message: 'Password was incorrect.' });
        }  

        // Generating user access and refresh tokens
        const userDataForTokenGeneration = {
            date: Date(),
            userId: foundUser.id,
            emailAddress: foundUser.emailAddress
        };

        const { accessToken, refreshToken } = await generateUserTokens(userDataForTokenGeneration);


        // Pushing new refresh token into foundUser, for refresh token rotation
        try {
            const saltRounds = 5;
            const hashedRefreshToken = await hashRefreshToken(refreshToken, saltRounds)
            foundUser.refreshTokens.push(hashedRefreshToken)
            await foundUser.save()            
        } catch (error) {
            console.log(error)
        }

        const refreshTokenExpiration = getTokenExpiration(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        const accessTokenExpiration = getTokenExpiration(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
  
        // Respond with success message and token data
        return NextResponse.json({
            success: true,
            message: 'User successfully logged in.',
            accessToken,
            refreshToken
        });        
    } catch (error) {
        console.log(error)
    }


}
