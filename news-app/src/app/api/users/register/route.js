const { v4: uuidv4 } = require('uuid');
const {generatePasswordHash} = require('../../../../lib/server-utils/auth')
const { mongooseConnect } = require("@/lib/mongoose") ;
const User =  require("@/lib/models/Users");
const {NextResponse} = require('next/server')

export const POST = async (req) =>{
    const requestBody = await req.json()
    const saltRounds = 5;
    const passwordHash = await generatePasswordHash(requestBody.password, saltRounds)

    try {

        // Creating new user data
        const newUserData = {
            id: uuidv4(),
            firstName: requestBody.firstName,
            lastName: requestBody.lastName,
            emailAddress: requestBody.emailAddress,
            password: passwordHash
        }; 

        // Connecting to MongoDB
        await mongooseConnect();

        // Inserting new user into database
        const newUser = new User(newUserData);
        const insertedUser = await newUser.save();


        return NextResponse.json({message: insertedUser}) 

    } catch (error) {
        console.log(error)
    }


}
