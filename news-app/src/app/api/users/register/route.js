const { v4: uuidv4 } = require('uuid');
const {generatePasswordHash} = require('../../../../lib/server-utils/auth')
const { mongooseConnect } = require("@/lib/mongoose") ;
const User =  require("@/lib/models/Users");
const {NextResponse} = require('next/server')

export const POST = async (req) =>{
    const input = await req.json()
    const saltRounds = 5;
    const passwordHash = await generatePasswordHash(input.password, saltRounds)

    const userData = {
        id: uuidv4(),
        firstName: input.firstName,
        lastName: input.lastName,
        emailAddress: input.emailAddress,
        password: passwordHash
    }; 

    await mongooseConnect();

    const newUser = new User(userData);
    const insertedUser = await newUser.save();
    console.log(input.firstName)
    return NextResponse.json({message: insertedUser})

}
