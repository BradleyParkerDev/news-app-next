const User = require('../../../models/Users')


//Update
const updateUser = async (req,res) => {
    try {
        const id = req.decoded.userData.userId
        let updates = req.body

        console.log(id)
        const response = await User.updateOne({id:id},updates)      

        if(!response){
            return res.status(404).json({success:false, message: 'User not found.'})
        } 
        return res.status(200).json({success:true, message: 'User updated successfully.', updatedUser: response})

    } catch (error) {
        console.log('Error updating user', error);
        return res.status(500).json({ success: false, message: 'Error updating user on the server.' });        
    }



}

module.exports = updateUser;

