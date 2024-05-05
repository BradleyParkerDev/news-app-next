const bcrypt = require('bcrypt');

const hashRefreshToken = async (refreshToken, saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(refreshToken, salt);
    return hash;
};

module.exports = hashRefreshToken;



