// Exports all auth utility functions


module.exports = {
    // hashing
    generatePasswordHash: require('./hashing/generatePasswordHash'),

    // tokens
    checkUserRefreshTokens: require('./tokens/checkUserRefreshTokens'),
    generateUserTokens: require('./tokens/generateUserTokens'),
    getTokenExpiration: require('./tokens/getTokenExpiration'),
    verifyRefreshToken: require('./tokens/verifyRefreshToken'),
    verifyUserToken: require('./tokens/verifyUserToken'),


    // validation
    validatePassword: require('./validation/validatePassword'),
};
