const { v4: uuidv4 } = require('uuid');
const User = require('../../../models/Users');
const{generatePasswordHash} = require('../../../auth')


//Register
const register = async (req,res) => {
    const saltRounds = 5;
    const password = req.body.password;
    const passwordHash = await generatePasswordHash(password, saltRounds)
    
    try {
        const newUser = new User({
            id: uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: passwordHash
        });        
        const insertedUser = await newUser.save();

        res.json({success: true, newUser: insertedUser});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.toString()})

    }
};

module.exports = register ;