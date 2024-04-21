const {NextResponse} = require('next/server')
const { mongooseConnect } = require("@server/mongoose") ;

const User = require('@server/models/Users')

export const PUT = async (request) =>{

    const userDataJSON = await request.headers.get('X-User-Data');
    const {userData} = JSON.parse(userDataJSON);
    console.log('userData: ',userData);
    // console.log(request.json())
    const updates = await request.json()
    console.log(updates)
    const response = await User.updateOne({id:userData.userId},updates)      

    return NextResponse.json({message: "Successfully updated user!", updates: updates})
    // const updates = request.json()
    // console.log(updates)
    // console.log(id)

    // if(!response){
    //     return res.status(404).json({success:false, message: 'User not found.'})
    // }
    // try {
    //     NextResponse.json({success:true,  message: 'User updated successfully.', updatedUser: response});

    // } catch (error) {
    //     NextResponse.json({success:false, messsage: error.toString()});
    // }
}

