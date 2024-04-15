const User = require('../../../models/Users')
//Delete
const deleteUser = async (req,res) => {

    try {
        const id = req.decoded.userData.userId

        console.log(id)
        const response = await User.deleteOne({id:id})   

        // Check if the response indicates that a document was deleted
        if (response.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        return res.status(200).json({success:true, message: 'User successfully deleted.', response: response})

    } catch (error) {
        console.log('Error deleting user', error);
        return res.status(500).json({ success: false, message: 'Error deleting user on the server.' });        
    }

}

module.exports = deleteUser;