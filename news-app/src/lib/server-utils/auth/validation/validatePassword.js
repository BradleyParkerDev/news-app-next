const bcrypt = require('bcrypt');


const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

module.exports = validatePassword;
